import JSONAPISource, {
  JSONAPIURLBuilder,
  JSONAPIResourceSerializer,
  Resource,
  JSONAPISerializers
} from '@orbit/jsonapi';
import MemorySource from '@orbit/memory';
import { KeyMap, Record, Schema, Source, Transform } from '@orbit/data';
import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import { buildSerializerClassFor, NoopSerializer } from '@orbit/serializers';

function createSchema(): Schema {
  return new Schema({
    models: {
      cards: {
        keys: {
          remoteId: {}
        },
        attributes: {
          // Instead of specifying individual attributes, the serializer is
          // currently configured to handle them opaquely.
          //
          // Alternatively, attributes could be specified as follows:
          //
          // csRealm: { type: 'string' },
          // csOriginalRealm: { type: 'string' },
          // csId: { type: 'string' },
          // csFieldSets: { type: 'object' }
        },
        relationships: {
          csAdoptsFrom: { kind: 'hasOne', type: 'card' }
        }
      }
    }
  });
}

function createKeyMap(): KeyMap {
  return new KeyMap();
}

function createMemorySource(schema: Schema, keyMap: KeyMap): MemorySource {
  return new MemorySource({ keyMap, schema });
}

function createRemoteSource(schema: Schema, keyMap: KeyMap): JSONAPISource {
  class URLBuilder extends JSONAPIURLBuilder {}

  class CustomResourceSerializer extends JSONAPIResourceSerializer {
    deserializeAttributes(record: Record, resource: Resource): void {
      if (resource.attributes) {
        record.attributes = resource.attributes;
      }
    }

    serializeAttributes(resource: Resource, record: Record): void {
      if (record.attributes) {
        resource.attributes = record.attributes;
      }
    }

    serializeMeta(resource: Resource, record: Record): void {
      // Include record meta in resource
      // Note: This is not done by default but is needed to pass `version`
      if (record.meta) {
        resource.meta = record.meta;
      }
    }
  }

  return new JSONAPISource({
    keyMap,
    name: 'remote',
    schema,
    namespace: 'api/realms/first-ephemeral-realm',
    URLBuilderClass: URLBuilder,
    serializerClassFor: buildSerializerClassFor({
      [JSONAPISerializers.Resource]: CustomResourceSerializer,
      [JSONAPISerializers.ResourceTypePath]: NoopSerializer
    })
  });
}

function createCoordinator(sources: Source[]): Coordinator {
  const coordinator = new Coordinator({
    sources
  });

  // Configure basic pessimistic strategies (i.e. `blocking: true`) to coordinate
  // querying and updating the `memory` and `remote` sources.

  // Query the `remote` server whenever the `memory` source is queried
  coordinator.addStrategy(
    new RequestStrategy({
      source: 'memory',
      on: 'beforeQuery',
      target: 'remote',
      action: 'query',
      blocking: true,
      passHints: true,
      async catch(e: Error) {
        console.error(e);
        this.source.requestQueue.skip(e);
        this.target.requestQueue.skip(e);
        throw e;
      }
    })
  );

  // Update the `remote` server whenever the `memory` source is updated
  coordinator.addStrategy(
    new RequestStrategy({
      source: 'memory',
      on: 'beforeUpdate',
      target: 'remote',
      action: 'update',
      blocking: true,
      passHints: true,
      filter(transform: Transform) {
        if (transform.options?.mock) {
          return false;
        } else {
          return true;
        }
      },
      async catch(e: Error) {
        console.error(e);
        this.source.requestQueue.skip(e);
        this.target.requestQueue.skip(e);
        throw e;
      }
    })
  );

  // Sync all transforms received from the `remote` server to the `memory` source
  coordinator.addStrategy(
    new SyncStrategy({
      source: 'remote',
      target: 'memory',
      blocking: true
    })
  );

  return coordinator;
}

export default function setupOrbit(): Coordinator {
  const schema = createSchema();
  const keyMap = createKeyMap();
  const remote = createRemoteSource(schema, keyMap);
  const memory = createMemorySource(schema, keyMap);

  return createCoordinator([memory, remote]);
}
