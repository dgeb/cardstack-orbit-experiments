// Source: https://gist.github.com/habdelra/f356040b35b6426c685aa1fbece2cd63#file-gistfile1-txt
// All requests and responses copied verbatim

export const createRequest = {
  data: {
    type: 'cards',
    attributes: {
      csFieldSets: {
        embedded: ['name']
      },
      csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
      csOriginalRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
      name: 'Mariko',
      puppies: [
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/vangogh',
          attributes: {
            name: 'Van Gogh',
            numberOfSpots: 150,
            houseBroken: true,
            favoriteToy: {
              attributes: {
                description: 'a beef bone'
              },
              relationships: {
                csAdoptsFrom: {
                  data: {
                    type: 'cards',
                    id:
                      'http://localhost:3000/api/realms/first-ephemeral-realm/cards/toy-card'
                  }
                }
              }
            },
            csId: 'vangogh',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            csAdoptsFrom: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card'
              }
            }
          }
        },
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mango',
          attributes: {
            name: 'Mango',
            numberOfSpots: 100,
            houseBroken: false,
            csId: 'mango',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            favoriteToy: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/squeaky-snake'
              }
            },
            csAdoptsFrom: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card'
              }
            }
          }
        }
      ]
    },
    relationships: {
      csAdoptsFrom: {
        data: {
          type: 'cards',
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card'
        }
      }
    }
  }
};

export const createResponse = {
  data: {
    id: 'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mariko',
    type: 'cards',
    attributes: {
      csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
      csId: 'mariko',
      csFieldSets: {
        embedded: ['name']
      },
      name: 'Mariko',
      puppies: [
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/vangogh',
          attributes: {
            name: 'Van Gogh',
            numberOfSpots: 150,
            houseBroken: true,
            favoriteToy: {
              attributes: {
                description: 'a beef bone'
              },
              relationships: {
                csAdoptsFrom: {
                  data: {
                    type: 'cards',
                    id:
                      'http://localhost:3000/api/realms/first-ephemeral-realm/cards/toy-card'
                  }
                }
              }
            },
            csId: 'vangogh',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            csAdoptsFrom: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card'
              }
            }
          }
        },
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mango',
          attributes: {
            name: 'Mango',
            numberOfSpots: 100,
            houseBroken: false,
            csId: 'mango',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            favoriteToy: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/squeaky-snake'
              }
            },
            csAdoptsFrom: {
              data: {
                type: 'cards',
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card'
              }
            }
          }
        }
      ]
    },
    relationships: {
      csAdoptsFrom: {
        data: {
          type: 'cards',
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card'
        }
      }
    },
    meta: {
      version: 20
    }
  },
  included: [
    {
      id:
        'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card',
      type: 'cards',
      attributes: {
        csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
        csId: 'owner-card',
        csFields: {
          name: {
            attributes: {
              csFieldArity: 'singular'
            },
            relationships: {
              csAdoptsFrom: {
                data: {
                  id: 'https://base.cardstack.com/public/cards/string-field',
                  type: 'cards'
                }
              }
            }
          },
          puppies: {
            attributes: {
              csFieldArity: 'plural'
            },
            relationships: {
              csAdoptsFrom: {
                data: {
                  id:
                    'http://localhost:3000/api/realms/first-ephemeral-realm/cards/puppy-card',
                  type: 'cards'
                }
              }
            }
          }
        },
        csFieldSets: {
          isolated: ['name', 'puppies']
        }
      },
      relationships: {
        csAdoptsFrom: {
          data: {
            type: 'cards',
            id: 'https://base.cardstack.com/public/cards/base'
          }
        }
      },
      meta: {
        version: 18
      }
    },
    {
      id: 'https://base.cardstack.com/public/cards/base',
      type: 'cards',
      attributes: {
        csRealm: 'https://base.cardstack.com/public',
        csId: 'base',
        csTitle: 'Base Card',
        csFeatures: {},
        csFiles: {
          'card.json':
            '{\n  "data": {\n    "type": "cards",\n    "attributes": {\n      "csTitle": "Base Card",\n      "csFeatures": {\n      }\n    },\n    "relationships": {\n    }\n  }\n}',
          'package.json':
            '{\n  "name": "@cardstack/base-card",\n  "version": "0.0.0",\n  "license": "MIT",\n  "publishConfig": {\n    "access": "public"\n  },\n  "peerDependencies": {\n    "@cardstack/hub": "*"\n  },\n  "devDependencies": {\n    "@cardstack/hub": "0.16.23"\n  }\n}\n'
        },
        csPeerDependencies: {
          '@cardstack/hub': '*'
        }
      },
      relationships: {}
    }
  ]
};

export const getRecordResponse = {
  data: {
    id: 'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mariko',
    type: 'cards',
    attributes: {
      csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
      csId: 'mariko',
      csFieldSets: {
        embedded: ['name']
      },
      name: 'Mariko',
      puppies: [
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/vangogh',
          attributes: {
            csId: 'vangogh',
            name: 'Van Gogh',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            favoriteToy: {
              attributes: {
                description: 'a beef bone'
              },
              relationships: {
                csAdoptsFrom: {
                  data: {
                    id:
                      'http://localhost:3000/api/realms/first-ephemeral-realm/cards/toy-card',
                    type: 'cards'
                  }
                }
              }
            },
            houseBroken: true,
            numberOfSpots: 150,
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            csAdoptsFrom: {
              data: {
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card',
                type: 'cards'
              }
            }
          }
        },
        {
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/mango',
          attributes: {
            csId: 'mango',
            name: 'Mango',
            csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
            houseBroken: false,
            numberOfSpots: 100,
            csOriginalRealm:
              'http://localhost:3000/api/realms/first-ephemeral-realm'
          },
          relationships: {
            favoriteToy: {
              data: {
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/squeaky-snake',
                type: 'cards'
              }
            },
            csAdoptsFrom: {
              data: {
                id:
                  'http://localhost:3000/api/realms/first-ephemeral-realm/cards/dalmatian-card',
                type: 'cards'
              }
            }
          }
        }
      ]
    },
    relationships: {
      csAdoptsFrom: {
        data: {
          type: 'cards',
          id:
            'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card'
        }
      }
    },
    meta: {
      version: 20
    }
  },
  included: [
    {
      id:
        'http://localhost:3000/api/realms/first-ephemeral-realm/cards/owner-card',
      type: 'cards',
      attributes: {
        csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
        csId: 'owner-card',
        csFields: {
          name: {
            attributes: {
              csFieldArity: 'singular'
            },
            relationships: {
              csAdoptsFrom: {
                data: {
                  id: 'https://base.cardstack.com/public/cards/string-field',
                  type: 'cards'
                }
              }
            }
          },
          puppies: {
            attributes: {
              csFieldArity: 'plural'
            },
            relationships: {
              csAdoptsFrom: {
                data: {
                  id:
                    'http://localhost:3000/api/realms/first-ephemeral-realm/cards/puppy-card',
                  type: 'cards'
                }
              }
            }
          }
        },
        csFieldSets: {
          isolated: ['name', 'puppies']
        }
      },
      relationships: {
        csAdoptsFrom: {
          data: {
            type: 'cards',
            id: 'https://base.cardstack.com/public/cards/base'
          }
        }
      },
      meta: {
        version: 18
      }
    },
    {
      id: 'https://base.cardstack.com/public/cards/base',
      type: 'cards',
      attributes: {
        csRealm: 'https://base.cardstack.com/public',
        csId: 'base',
        csTitle: 'Base Card',
        csFeatures: {},
        csFiles: {
          'card.json':
            '{\n  "data": {\n    "type": "cards",\n    "attributes": {\n      "csTitle": "Base Card",\n      "csFeatures": {\n      }\n    },\n    "relationships": {\n    }\n  }\n}',
          'package.json':
            '{\n  "name": "@cardstack/base-card",\n  "version": "0.0.0",\n  "license": "MIT",\n  "publishConfig": {\n    "access": "public"\n  },\n  "peerDependencies": {\n    "@cardstack/hub": "*"\n  },\n  "devDependencies": {\n    "@cardstack/hub": "0.16.23"\n  }\n}\n'
        },
        csPeerDependencies: {
          '@cardstack/hub': '*'
        }
      },
      relationships: {}
    }
  ]
};

export const getFilteredQueryResponse = {
  data: [
    {
      id: 'http://localhost:3000/api/realms/first-ephemeral-realm/cards/5',
      type: 'cards',
      attributes: {
        csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
        csId: '5',
        csFields: {
          name: {
            attributes: {},
            relationships: {
              csAdoptsFrom: {
                data: {
                  id: 'https://base.cardstack.com/public/cards/string-field',
                  type: 'cards'
                }
              }
            }
          },
          favoriteColor: {
            attributes: {},
            relationships: {
              csAdoptsFrom: {
                data: {
                  id: 'https://base.cardstack.com/public/cards/string-field',
                  type: 'cards'
                }
              }
            }
          }
        },
        name: 'Van Gogh',
        favoriteColor: 'orange'
      },
      relationships: {
        csAdoptsFrom: {
          data: {
            type: 'cards',
            id: 'https://base.cardstack.com/public/cards/base'
          }
        }
      },
      meta: {
        version: 35
      }
    }
  ],
  meta: {
    page: {
      total: 1
    }
  },
  included: [
    {
      id: 'https://base.cardstack.com/public/cards/base',
      type: 'cards',
      attributes: {
        csRealm: 'https://base.cardstack.com/public',
        csId: 'base',
        csTitle: 'Base Card',
        csFeatures: {},
        csFiles: {
          'card.json':
            '{\n  "data": {\n    "type": "cards",\n    "attributes": {\n      "csTitle": "Base Card",\n      "csFeatures": {\n      }\n    },\n    "relationships": {\n    }\n  }\n}',
          'package.json':
            '{\n  "name": "@cardstack/base-card",\n  "version": "0.0.0",\n  "license": "MIT",\n  "publishConfig": {\n    "access": "public"\n  },\n  "peerDependencies": {\n    "@cardstack/hub": "*"\n  },\n  "devDependencies": {\n    "@cardstack/hub": "0.16.23"\n  }\n}\n'
        },
        csPeerDependencies: {
          '@cardstack/hub': '*'
        }
      },
      relationships: {}
    }
  ]
};

export const patchRequest = {
  data: {
    type: 'cards',
    // QUESTION: Why is `id` not passed here?
    attributes: {
      favoriteColor: 'orange'
    },
    meta: {
      version: 39
    }
  }
};

export const patchResponse = {
  data: {
    id: 'http://localhost:3000/api/realms/first-ephemeral-realm/cards/7',
    type: 'cards',
    attributes: {
      csRealm: 'http://localhost:3000/api/realms/first-ephemeral-realm',
      csId: '7',
      csFields: {
        name: {
          attributes: {},
          relationships: {
            csAdoptsFrom: {
              data: {
                id: 'https://base.cardstack.com/public/cards/string-field',
                type: 'cards'
              }
            }
          }
        },
        favoriteColor: {
          attributes: {},
          relationships: {
            csAdoptsFrom: {
              data: {
                id: 'https://base.cardstack.com/public/cards/string-field',
                type: 'cards'
              }
            }
          }
        }
      },
      name: 'Van Gogh',
      favoriteColor: 'orange'
    },
    relationships: {
      csAdoptsFrom: {
        data: {
          type: 'cards',
          id: 'https://base.cardstack.com/public/cards/base'
        }
      }
    },
    meta: {
      version: 40
    }
  },
  included: [
    {
      id: 'https://base.cardstack.com/public/cards/base',
      type: 'cards',
      attributes: {
        csRealm: 'https://base.cardstack.com/public',
        csId: 'base',
        csTitle: 'Base Card',
        csFeatures: {},
        csFiles: {
          'card.json':
            '{\n  "data": {\n    "type": "cards",\n    "attributes": {\n      "csTitle": "Base Card",\n      "csFeatures": {\n      }\n    },\n    "relationships": {\n    }\n  }\n}',
          'package.json':
            '{\n  "name": "@cardstack/base-card",\n  "version": "0.0.0",\n  "license": "MIT",\n  "publishConfig": {\n    "access": "public"\n  },\n  "peerDependencies": {\n    "@cardstack/hub": "*"\n  },\n  "devDependencies": {\n    "@cardstack/hub": "0.16.23"\n  }\n}\n'
        },
        csPeerDependencies: {
          '@cardstack/hub': '*'
        }
      },
      relationships: {}
    }
  ]
};
