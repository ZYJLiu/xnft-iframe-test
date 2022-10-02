export type TokenRewards = {
  version: "0.1.0"
  name: "token_rewards"
  instructions: [
    {
      name: "initMerchant"
      accounts: [
        {
          name: "merchant"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "MERCHANT"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "user"
              }
            ]
          }
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "params"
          type: {
            defined: "InitMerchantParams"
          }
        }
      ]
    },
    {
      name: "createPromo"
      accounts: [
        {
          name: "merchant"
          isMut: true
          isSigner: false
        },
        {
          name: "promo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "account"
                type: "publicKey"
                account: "MerchantState"
                path: "merchant"
              },
              {
                kind: "account"
                type: "u64"
                account: "MerchantState"
                path: "merchant.promo_count"
              }
            ]
          }
        },
        {
          name: "promoMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "MINT"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "PromoState"
                path: "promo"
              }
            ]
          }
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "params"
          type: {
            defined: "CreatePromoParams"
          }
        }
      ]
    },
    {
      name: "mintPromo"
      accounts: [
        {
          name: "promo"
          isMut: false
          isSigner: false
        },
        {
          name: "promoMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "MINT"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "PromoState"
                path: "promo"
              }
            ]
          }
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "createReward"
      accounts: [
        {
          name: "merchant"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "REWARD"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "MerchantState"
                path: "merchant"
              }
            ]
          }
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "params"
          type: {
            defined: "CreateRewardParams"
          }
        }
      ]
    },
    {
      name: "mintReward"
      accounts: [
        {
          name: "merchant"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "REWARD"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "MerchantState"
                path: "merchant"
              }
            ]
          }
        },
        {
          name: "usdcMint"
          isMut: false
          isSigner: false
        },
        {
          name: "receiverRewardToken"
          isMut: true
          isSigner: false
        },
        {
          name: "customerUsdcToken"
          isMut: true
          isSigner: false
        },
        {
          name: "merchantUsdcToken"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: false
        },
        {
          name: "receiver"
          isMut: true
          isSigner: false
        },
        {
          name: "customer"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "params"
          type: {
            defined: "MintRewardParams"
          }
        }
      ]
    },
    {
      name: "burnReward"
      accounts: [
        {
          name: "merchant"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "REWARD"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "MerchantState"
                path: "merchant"
              }
            ]
          }
        },
        {
          name: "customerRewardToken"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: false
        },
        {
          name: "customer"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "params"
          type: {
            defined: "BurnRewardParams"
          }
        }
      ]
    }
  ]
  accounts: [
    {
      name: "merchantState"
      type: {
        kind: "struct"
        fields: [
          {
            name: "user"
            type: "publicKey"
          },
          {
            name: "mint"
            type: "publicKey"
          },
          {
            name: "mintBump"
            type: "u8"
          },
          {
            name: "promoCount"
            type: "u64"
          },
          {
            name: "image"
            type: "string"
          },
          {
            name: "name"
            type: "string"
          }
        ]
      }
    },
    {
      name: "promoState"
      type: {
        kind: "struct"
        fields: [
          {
            name: "user"
            type: "publicKey"
          },
          {
            name: "mint"
            type: "publicKey"
          },
          {
            name: "bump"
            type: "u8"
          }
        ]
      }
    }
  ]
  types: [
    {
      name: "BurnRewardParams"
      type: {
        kind: "struct"
        fields: [
          {
            name: "amount"
            type: "u64"
          }
        ]
      }
    },
    {
      name: "CreatePromoParams"
      type: {
        kind: "struct"
        fields: [
          {
            name: "name"
            type: "string"
          },
          {
            name: "symbol"
            type: "string"
          },
          {
            name: "uri"
            type: "string"
          }
        ]
      }
    },
    {
      name: "CreateRewardParams"
      type: {
        kind: "struct"
        fields: [
          {
            name: "name"
            type: "string"
          },
          {
            name: "symbol"
            type: "string"
          },
          {
            name: "uri"
            type: "string"
          }
        ]
      }
    },
    {
      name: "InitMerchantParams"
      type: {
        kind: "struct"
        fields: [
          {
            name: "name"
            type: "string"
          },
          {
            name: "image"
            type: "string"
          }
        ]
      }
    },
    {
      name: "MintRewardParams"
      type: {
        kind: "struct"
        fields: [
          {
            name: "amount"
            type: "u64"
          }
        ]
      }
    }
  ]
}

export const IDL: TokenRewards = {
  version: "0.1.0",
  name: "token_rewards",
  instructions: [
    {
      name: "initMerchant",
      accounts: [
        {
          name: "merchant",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "MERCHANT",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "user",
              },
            ],
          },
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "InitMerchantParams",
          },
        },
      ],
    },
    {
      name: "createPromo",
      accounts: [
        {
          name: "merchant",
          isMut: true,
          isSigner: false,
        },
        {
          name: "promo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "account",
                type: "publicKey",
                account: "MerchantState",
                path: "merchant",
              },
              {
                kind: "account",
                type: "u64",
                account: "MerchantState",
                path: "merchant.promo_count",
              },
            ],
          },
        },
        {
          name: "promoMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "MINT",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "PromoState",
                path: "promo",
              },
            ],
          },
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreatePromoParams",
          },
        },
      ],
    },
    {
      name: "mintPromo",
      accounts: [
        {
          name: "promo",
          isMut: false,
          isSigner: false,
        },
        {
          name: "promoMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "MINT",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "PromoState",
                path: "promo",
              },
            ],
          },
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createReward",
      accounts: [
        {
          name: "merchant",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "REWARD",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "MerchantState",
                path: "merchant",
              },
            ],
          },
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateRewardParams",
          },
        },
      ],
    },
    {
      name: "mintReward",
      accounts: [
        {
          name: "merchant",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "REWARD",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "MerchantState",
                path: "merchant",
              },
            ],
          },
        },
        {
          name: "usdcMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receiverRewardToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customerUsdcToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "merchantUsdcToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "MintRewardParams",
          },
        },
      ],
    },
    {
      name: "burnReward",
      accounts: [
        {
          name: "merchant",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "REWARD",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "MerchantState",
                path: "merchant",
              },
            ],
          },
        },
        {
          name: "customerRewardToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "BurnRewardParams",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "merchantState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "mintBump",
            type: "u8",
          },
          {
            name: "promoCount",
            type: "u64",
          },
          {
            name: "image",
            type: "string",
          },
          {
            name: "name",
            type: "string",
          },
        ],
      },
    },
    {
      name: "promoState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "BurnRewardParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "CreatePromoParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
        ],
      },
    },
    {
      name: "CreateRewardParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
        ],
      },
    },
    {
      name: "InitMerchantParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "image",
            type: "string",
          },
        ],
      },
    },
    {
      name: "MintRewardParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
  ],
}
