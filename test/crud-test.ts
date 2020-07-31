import { Record, Schema } from '@orbit/data';
import setupOrbit from './support/setup-orbit';
import { jsonapiResponse } from './support/jsonapi';
import {
  createRequest,
  createResponse,
  getRecordResponse,
  getFilteredQueryResponse,
  patchRequest,
  patchResponse
} from './support/mock-data';
import { SinonStub } from 'sinon';
import * as sinon from 'sinon';
import Coordinator from '@orbit/coordinator';
import MemorySource from '@orbit/memory';

const { module, test } = QUnit;

module('Simple CRUD', function (hooks) {
  let coordinator: Coordinator;
  let memory: MemorySource;
  let schema: Schema;
  let fetchStub: SinonStub;
  let baseCard: Record;
  let ownerCard: Record;

  hooks.beforeEach(async function () {
    fetchStub = sinon.stub(self, 'fetch');

    coordinator = setupOrbit();
    memory = coordinator.getSource('memory') as MemorySource;
    schema = memory.schema;

    // Seed data in memory that's referenced by other records
    //
    // This is done prior to coordinator activation, so that updates aren't
    // pushed by the remote source.
    baseCard = await memory.update((t) =>
      t.addRecord({
        type: 'cards',
        id: schema.generateId(),
        keys: {
          remoteId: 'https://base.cardstack.com/public/cards/base'
        }
      })
    );

    ownerCard = await memory.update((t) =>
      t.addRecord({
        type: 'cards',
        id: schema.generateId(),
        keys: {
          remoteId:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card'
        }
      })
    );

    await coordinator.activate();
  });

  hooks.afterEach(async function () {
    await coordinator.deactivate();
    fetchStub.restore();
  });

  test('Creating a card', async function (assert) {
    fetchStub
      .withArgs('/api/realms/first-ephemeral-realm/cards')
      .returns(jsonapiResponse(201, createResponse));

    let record: Record = {
      type: 'cards',
      id: schema.generateId(),
      attributes: {
        ...createRequest.data.attributes
      },
      relationships: {
        csAdoptsFrom: {
          data: {
            type: 'cards',
            id: ownerCard.id
          }
        }
      }
    };

    let createdRecord = await memory.update((t) => t.addRecord(record));

    assert.deepEqual(
      createRequest,
      JSON.parse(fetchStub.firstCall.lastArg.body),
      'request document matches expectations'
    );

    assert.deepEqual(
      createdRecord,
      {
        ...record,
        keys: {
          // Because we're working with local `id`s, the server-generated
          // resource `id` needs to be stored as a key. Conventionally, Orbit
          // applications use `remoteId` for this purpose. See the serializer's
          // `resourceKey` method to understand how this is applied.
          remoteId:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mariko'
        },
        attributes: {
          // All the attributes originally assigned to the record should be
          // applied successfully
          ...record.attributes,
          // In addition, `csId` is a new attribute assigned by the server
          csId: 'mariko'
        },
        meta: {
          version: 20
        }
      },
      'created record matches expectations'
    );
  });

  test('Getting a card', async function (assert) {
    fetchStub
      .withArgs('/api/realms/first-ephemeral-realm/cards/mariko')
      .returns(jsonapiResponse(200, getRecordResponse));

    // Querying for a single record could be driven by either:
    // 1) You know the remote URL of the record, but have not yet assigned a
    // .  local `id`.
    // 2) You know the local `id` and want a fresh version from the server.
    // 3) You have remote `id`, from which you can infer a remote URL.
    //
    // The following example represents the first case. Orbit can handle the
    // other two cases as well (but they're not included in this example).
    let foundRecord = await memory.query(
      (t) => t.findRecord({ type: 'cards', id: undefined }),
      {
        url: '/api/realms/first-ephemeral-realm/cards/mariko'
      }
    );

    assert.deepEqual(
      foundRecord,
      {
        ...getRecordResponse.data,
        // The found record's `id` will be a locally-generated UUID, not known
        // until it's been assigned.
        id: foundRecord.id,
        keys: {
          // Because we're working with local `id`s, the server-generated
          // resource `id` needs to be stored as a key. Conventionally, Orbit
          // applications use `remoteId` for this purpose. See the serializer's
          // `resourceKey` method to understand how this is applied.
          remoteId:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mariko'
        },
        relationships: {
          csAdoptsFrom: {
            data: {
              type: 'cards',
              id: ownerCard.id
            }
          }
        }
      },
      'created record matches expectations'
    );
  });

  test('Querying for cards', async function (assert) {
    const url =
      '/api/cards?filter[type][csRealm]=https://base.cardstack.com/public&filter[type][csId]=base&page[size]=1000';

    fetchStub
      .withArgs(url)
      .returns(jsonapiResponse(200, getFilteredQueryResponse));

    let records = await memory.query((t) => t.findRecords('cards'), { url });

    assert.deepEqual(
      records,
      [
        {
          ...getFilteredQueryResponse.data[0],
          // The found record's `id` will be a locally-generated UUID, not known
          // until it's been assigned.
          id: records[0].id,
          keys: {
            // Because we're working with local `id`s, the server-generated
            // resource `id` needs to be stored as a key. Conventionally, Orbit
            // applications use `remoteId` for this purpose. See the serializer's
            // `resourceKey` method to understand how this is applied.
            remoteId:
              'http://localhost:3000/api/realms/first-ephemeral-realm/cards/5'
          },
          relationships: {
            csAdoptsFrom: {
              data: {
                type: 'cards',
                id: baseCard.id
              }
            }
          }
        }
      ],
      'queried records match expectations'
    );
  });

  test('Patching a card', async function (assert) {
    // Create a record in memory using the custom `mock` option to prevent
    // it from being POSTed to the remote source (see the custom `filter`
    // defined for the `beforeUpdate` strategy).
    let record = await memory.update(
      (t) =>
        t.addRecord({
          type: 'cards',
          id: schema.generateId(),
          attributes: {
            ...patchResponse.data.attributes,
            // We'll override the `favoriteColor` attribute here so that it
            // can be patched below.
            favoriteColor: 'blue'
          },
          keys: {
            remoteId: '7'
          },
          meta: {
            version: 39
          }
        }),
      {
        mock: true
      }
    );

    fetchStub
      .withArgs('/api/realms/first-ephemeral-realm/cards/7')
      .returns(jsonapiResponse(200, patchResponse));

    await memory.update((t) =>
      t.updateRecord({
        type: record.type,
        id: record.id,
        attributes: {
          favoriteColor: 'orange'
        },
        // Include record meta here to ensure that `version` is passed
        meta: record.meta
      })
    );

    // TODO: This will fail because `id` apparently is not passed. This
    // is in violation of the JSON:API spec.
    // Was this an oversight in the request data?
    assert.deepEqual(
      JSON.parse(fetchStub.firstCall.lastArg.body),
      patchRequest,
      'request document matches expectations'
    );

    let updatedRecord = memory.cache.query((q) =>
      q.findRecord(record)
    ) as Record;

    assert.deepEqual(
      updatedRecord,
      {
        id: updatedRecord.id,
        type: 'cards',
        keys: {
          // Because we're working with local `id`s, the server-generated
          // resource `id` needs to be stored as a key. Conventionally, Orbit
          // applications use `remoteId` for this purpose. See the serializer's
          // `resourceKey` method to understand how this is applied.
          remoteId:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/7'
        },
        attributes: {
          // All the attributes originally assigned to the record should be
          // applied successfully
          ...patchResponse.data.attributes
        },
        relationships: {
          csAdoptsFrom: {
            data: {
              // The related record's local `id` needs to be mapped from its
              // `remoteId` key in the response.
              id: memory.keyMap.keyToId(
                'cards',
                'remoteId',
                patchResponse.data.relationships.csAdoptsFrom.data.id
              ),
              type: 'cards'
            }
          }
        },
        meta: {
          ...patchResponse.data.meta
        }
      },
      'updated record matches expectations'
    );
  });
});
