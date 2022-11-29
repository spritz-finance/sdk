/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type {
  SpritzSmartPay,
  SpritzSmartPayInterface,
} from "../../contracts/SpritzSmartPay";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spritzPay",
        type: "address",
      },
      {
        internalType: "address",
        name: "autoTaskWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ChargeSubscriptionFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
    ],
    name: "InvalidPaymentCharge",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "UnauthorizedExecutor",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "SubscriptionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "SubscriptionDeactivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "UserActivated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "canChargeSubscription",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "paymentAmount",
        type: "uint32",
      },
      {
        internalType: "uint128",
        name: "totalPayments",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "paymentReference",
        type: "bytes32",
      },
      {
        internalType: "enum SpritzSmartPay.SubscriptionCadence",
        name: "cadence",
        type: "uint8",
      },
    ],
    name: "createSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "deactivateSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveUsers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "getSubscription",
    outputs: [
      {
        components: [
          {
            internalType: "enum SpritzSmartPay.SubscriptionCadence",
            name: "cadence",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "paymentAmount",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "paymentCount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "totalPayments",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPaymentTimestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "paymentReference",
            type: "bytes32",
          },
        ],
        internalType: "struct SpritzSmartPay.Subscription",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserSubscriptionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserSubscriptions",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "subscriptionId",
        type: "bytes32",
      },
    ],
    name: "processPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "subscriptionNonce",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "subscriptions",
    outputs: [
      {
        internalType: "enum SpritzSmartPay.SubscriptionCadence",
        name: "cadence",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "paymentAmount",
        type: "uint32",
      },
      {
        internalType: "uint128",
        name: "paymentCount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "totalPayments",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPaymentTimestamp",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "paymentReference",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620024433803806200244383398101604081905262000034916200011b565b6000805460ff191690556200004933620000a5565b6001600160a01b03821615806200006757506001600160a01b038116155b15620000865760405163e6c4247b60e01b815260040160405180910390fd5b6001600160601b0319606092831b8116608052911b1660a05262000153565b600080546001600160a01b03838116610100818102610100600160a81b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b80516001600160a01b03811681146200011657600080fd5b919050565b600080604083850312156200012f57600080fd5b6200013a83620000fe565b91506200014a60208401620000fe565b90509250929050565b60805160601c60a05160601c6122c0620001836000396000505060008181610ccb0152610d6601526122c06000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a6116100975780639910705b116100665780639910705b14610295578063ca6efcdd146102a8578063f2fde38b146102e9578063f5593607146102fc57600080fd5b8063715018a6146101c95780638456cb59146101d15780638da5cb5b146101d957806394259c6c1461020257600080fd5b80634eabe457116100d35780634eabe4571461016b578063539025061461018c5780635c975abb1461019f57806361d80c24146101b657600080fd5b80631f32768e146101055780632e6ca5881461012e5780633a74717d1461014e5780633f4ba83a14610163575b600080fd5b610118610113366004611bbb565b610311565b6040516101259190611df3565b60405180910390f35b61014161013c366004611b7e565b61041a565b6040516101259190611d22565b61016161015c366004611bbb565b610444565b005b61016161054b565b61017e610179366004611b7e565b61055d565b604051908152602001610125565b61016161019a366004611bbb565b61057e565b60005460ff165b6040519015158152602001610125565b6101616101c4366004611bed565b6106b9565b610161610910565b610161610922565b60005461010090046001600160a01b03166040516001600160a01b039091168152602001610125565b610280610210366004611bbb565b6003602081905260009182526040909120805460018201546002830154938301546004840154600585015460069095015460ff85169663ffffffff610100870416966001600160801b036501000000000090970487169695909516946001600160a01b0391821694909116929189565b60405161012599989796959493929190611d5a565b6101a66102a3366004611bbb565b610932565b6102d16102b6366004611b7e565b6005602052600090815260409020546001600160801b031681565b6040516001600160801b039091168152602001610125565b6101616102f7366004611b7e565b610a40565b610304610acd565b6040516101259190611cd5565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e0810182905261010081019190915260008281526003602052604090819020815161012081019092528054829060ff16600281111561038c5761038c612271565b600281111561039d5761039d612271565b8152815461010080820463ffffffff166020840152650100000000009091046001600160801b039081166040840152600184015416606083015260028301546001600160a01b03908116608084015260038401541660a0830152600483015460c0830152600583015460e083015260069092015491015292915050565b6001600160a01b038116600090815260046020526040902060609061043e90610ade565b92915050565b61044c610ae9565b60008181526003602052604081209061046483610932565b9050806104ab576040517f82f4b156000000000000000000000000000000000000000000000000000000008152600481018490524260248201526044015b60405180910390fd5b42600583810191909155825460019184916104d99084906501000000000090046001600160801b0316611ee0565b82546001600160801b0391821661010093840a908102920219161790915583546003850154600093506105209263ffffffff920491909116906001600160a01b0316610b3c565b905061052d838583610c8a565b6003830154610545906001600160a01b031682610cae565b50505050565b610553610d92565b61055b610df2565b565b6001600160a01b038116600090815260046020526040812061043e90610e44565b600081815260036020526040902060028101546001600160a01b031633146105d4576040517f170b9abb0000000000000000000000000000000000000000000000000000000081523360048201526024016104a2565b3360009081526004602052604090206105ed9083610e4e565b50600082815260036020819052604080832080547fffffffffffffffffffffff0000000000000000000000000000000000000000001681556001810180546fffffffffffffffffffffffffffffffff1916905560028101805473ffffffffffffffffffffffffffffffffffffffff1990811690915592810180549093169092556004820183905560058201839055600690910182905551839133917fa7eb2c80cd483b6afbfd9a7c74ba3873e0b2e55e73fddd632e695fec0f7a6ec29190a3506106b633610e61565b50565b3360009081526005602052604080822080546001600160801b03808216600101166fffffffffffffffffffffffffffffffff19909116179055805161012081019091528083600281111561070f5761070f612271565b81526020018863ffffffff16815260200160006001600160801b03168152602001876001600160801b03168152602001336001600160a01b03168152602001866001600160a01b0316815260200185815260200160008152602001848152509050600061077a610f0e565b6000818152600360205260409020835181549293508492829060ff191660018360028111156107ab576107ab612271565b0217905550602082810151825460408086015174ffffffffffffffffffffffffffffffffffffffff001990921661010063ffffffff94851681027fffffffffffffffffffffff00000000000000000000000000000000ffffffffff1691909117650100000000006001600160801b039485160217865560608701516001870180546fffffffffffffffffffffffffffffffff19169190941617909255608086015160028601805473ffffffffffffffffffffffffffffffffffffffff199081166001600160a01b039384161790915560a0880151600388018054909216921691909117905560c086015160048087019190915560e087015160058701559190950151600690940193909355336000908152929091529190206108cf918390610f8b16565b50604051819033907f6a3a48b5925595b0ce0e996429280ed5bbb7492932b261842949ace66c606b1a90600090a3505061090833610e61565b505050505050565b610918610d92565b61055b6000610f97565b61092a610d92565b61055b610ffd565b60008061093e83610311565b9050600081606001516001600160801b0316118015610976575080606001516001600160801b031681604001516001600160801b0316145b156109845750600092915050565b8051600081600281111561099a5761099a612271565b14156109c65760c082015160408301516109be9142916001600160801b031661103a565b949350505050565b60018160028111156109da576109da612271565b14156109fe5760c082015160408301516109be9142916001600160801b03166110de565b6002816002811115610a1257610a12612271565b1415610a365760c082015160408301516109be9142916001600160801b031661113f565b5060009392505050565b610a48610d92565b6001600160a01b038116610ac45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104a2565b6106b681610f97565b6060610ad96001611166565b905090565b606061043e8261116f565b60005460ff161561055b5760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016104a2565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f313ce567000000000000000000000000000000000000000000000000000000001790529051600091829182916001600160a01b03861691610bb09190611cb9565b600060405180830381855afa9150503d8060008114610beb576040519150601f19603f3d011682016040523d82523d6000602084013e610bf0565b606091505b509150915081610c425760405162461bcd60e51b815260206004820152601460248201527f636f756c646e742067657420646563696d616c7300000000000000000000000060448201526064016104a2565b600081806020019051810190610c589190611c74565b9050610c656002826121bf565b610c7090600a611fc7565b610c809063ffffffff88166120f9565b9695505050505050565b600383015460028401546001600160a01b03918216916105459183911630856111cb565b604051636eb1769f60e11b81523060048201526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660248301528391839183169063dd62ed3e9060440160206040518083038186803b158015610d1957600080fd5b505afa158015610d2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d519190611bd4565b1015610d8d57610d8d6001600160a01b0382167f000000000000000000000000000000000000000000000000000000000000000060001961127c565b505050565b6000546001600160a01b0361010090910416331461055b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104a2565b610dfa6113c0565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600061043e825490565b6000610e5a8383611412565b9392505050565b6000610e6e600183611505565b6001600160a01b0383166000908152600460205260408120919250610e9282610e44565b9050828015610e9f575080155b15610eb557610eaf600185611527565b50610545565b82158015610ec35750600081115b1561054557610ed360018561153c565b506040516001600160a01b038516907fd4719dd6c50c53a868b4c8eb187c166965be87e084f350aab18e6b0f141c773490600090a250505050565b3360008181526005602090815260408083205490519293610f709390926001600160801b03909216910160609290921b6bffffffffffffffffffffffff1916825260801b6fffffffffffffffffffffffffffffffff1916601482015260240190565b60405160208183030381529060405280519060200120905090565b6000610e5a838361154d565b600080546001600160a01b0383811661010081810274ffffffffffffffffffffffffffffffffffffffff0019851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b611005610ae9565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e273390565b6000806110468561159c565b905060006110538561159c565b90506000611061828461160e565b9050848110156110775760009350505050610e5a565b8151601d60ff8216106110b257600061109885604001518660200151611682565b9050836000015160ff168160ff1610156110b0578091505b505b835160ff80831691161015806110d257506110ce866001611f0b565b8210155b98975050505050505050565b6000806110ea8561171c565b905060006110f78561171c565b905060006111058688611750565b90508481101561111b5760009350505050610e5a565b81831015806111345750611130856001611f0b565b8110155b979650505050505050565b60008061114b85611775565b9050600061115885611775565b905060006111058688611793565b60606000610e5a835b6060816000018054806020026020016040519081016040528092919081815260200182805480156111bf57602002820191906000526020600020905b8154815260200190600101908083116111ab575b50505050509050919050565b6040516001600160a01b03808516602483015283166044820152606481018290526105459085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526117b7565b8015806113055750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e9060440160206040518083038186803b1580156112cb57600080fd5b505afa1580156112df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113039190611bd4565b155b6113775760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084016104a2565b6040516001600160a01b038316602482015260448101829052610d8d9084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611218565b60005460ff1661055b5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016104a2565b600081815260018301602052604081205480156114fb576000611436600183612183565b855490915060009061144a90600190612183565b90508181146114af57600086600001828154811061146a5761146a61229d565b906000526020600020015490508087600001848154811061148d5761148d61229d565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806114c0576114c0612287565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061043e565b600091505061043e565b6001600160a01b03811660009081526001830160205260408120541515610e5a565b6000610e5a836001600160a01b038416611412565b6000610e5a836001600160a01b0384165b60008181526001830160205260408120546115945750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561043e565b50600061043e565b60408051608081018252600080825260208201819052918101829052606081018290529080806115d76115d26201518087611f70565b61189c565b6040805160808101825260ff928316815291909216602082015263ffffffff90921690820152606081019590955250929392505050565b600081606001518360600151111561162557600080fd5b826020015160ff168360400151600c61163e9190612118565b836020015160ff168460400151600c6116579190612118565b6116619190611f23565b61166b919061219a565b611675919061219a565b63ffffffff169392505050565b60008160ff166001148061169957508160ff166003145b806116a757508160ff166005145b806116b557508160ff166007145b806116c357508160ff166008145b806116d157508160ff16600a145b806116df57508160ff16600c145b156116ec5750601f61043e565b8160ff166002146116ff5750601e61043e565b61170883611a10565b61171357601c610e5a565b50601d92915050565b60008061172c6201518084611f70565b9050600761173b826003611f0b565b611745919061220e565b610e5a906001611f0b565b60008061175d8484611793565b611768906002611f0b565b90506109be600782611f70565b600080611785620151808461220e565b9050610e5a610e1082611f70565b6000818311156117a257600080fd5b826117ad8184612183565b610e5a9190611f70565b600061180c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611a5e9092919063ffffffff16565b805190915015610d8d578080602001905181019061182a9190611b99565b610d8d5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104a2565b60008080838162253d8c6118b38362010bd9611ea1565b6118bd9190611ea1565b9050600062023ab16118d0836004612072565b6118da9190611f42565b905060046118eb8262023ab1612072565b6118f6906003611ea1565b6119009190611f42565b61190a9083612144565b9150600062164b0961191d846001611ea1565b61192990610fa0612072565b6119339190611f42565b90506004611943826105b5612072565b61194d9190611f42565b6119579084612144565b61196290601f611ea1565b9250600061098f611974856050612072565b61197e9190611f42565b9050600060506119908361098f612072565b61199a9190611f42565b6119a49086612144565b90506119b1600b83611f42565b94506119be85600c612072565b6119c9836002611ea1565b6119d39190612144565b915084836119e2603187612144565b6119ed906064612072565b6119f79190611ea1565b611a019190611ea1565b9a919950975095505050505050565b6000611a1d600483612222565b63ffffffff16158015611a3f5750611a36606483612222565b63ffffffff1615155b8061043e5750611a5161019083612222565b63ffffffff161592915050565b60606109be8484600085856001600160a01b0385163b611ac05760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104a2565b600080866001600160a01b03168587604051611adc9190611cb9565b60006040518083038185875af1925050503d8060008114611b19576040519150601f19603f3d011682016040523d82523d6000602084013e611b1e565b606091505b509150915061113482828660608315611b38575081610e5a565b825115611b485782518084602001fd5b8160405162461bcd60e51b81526004016104a29190611dc0565b80356001600160a01b0381168114611b7957600080fd5b919050565b600060208284031215611b9057600080fd5b610e5a82611b62565b600060208284031215611bab57600080fd5b81518015158114610e5a57600080fd5b600060208284031215611bcd57600080fd5b5035919050565b600060208284031215611be657600080fd5b5051919050565b60008060008060008060c08789031215611c0657600080fd5b863563ffffffff81168114611c1a57600080fd5b955060208701356001600160801b0381168114611c3657600080fd5b9450611c4460408801611b62565b9350606087013592506080870135915060a087013560038110611c6657600080fd5b809150509295509295509295565b600060208284031215611c8657600080fd5b815160ff81168114610e5a57600080fd5b60038110611cb557634e487b7160e01b600052602160045260246000fd5b9052565b60008251611ccb8184602087016121e2565b9190910192915050565b6020808252825182820181905260009190848201906040850190845b81811015611d165783516001600160a01b031683529284019291840191600101611cf1565b50909695505050505050565b6020808252825182820181905260009190848201906040850190845b81811015611d1657835183529284019291840191600101611d3e565b6101208101611d69828c611c97565b63ffffffff9990991660208201526001600160801b0397881660408201529590961660608601526001600160a01b0393841660808601529190921660a084015260c083019190915260e08201526101000152919050565b6020815260008251806020840152611ddf8160408501602087016121e2565b601f01601f19169190910160400192915050565b600061012082019050611e07828451611c97565b63ffffffff60208401511660208301526001600160801b0360408401511660408301526060830151611e4460608401826001600160801b03169052565b506080830151611e5f60808401826001600160a01b03169052565b5060a0830151611e7a60a08401826001600160a01b03169052565b5060c083015160c083015260e083015160e083015261010080840151818401525092915050565b6000808212826001600160ff1b0303841381151615611ec257611ec2612245565b82600160ff1b038412811615611eda57611eda612245565b50500190565b60006001600160801b03808316818516808303821115611f0257611f02612245565b01949350505050565b60008219821115611f1e57611f1e612245565b500190565b600063ffffffff808316818516808303821115611f0257611f02612245565b600082611f5157611f5161225b565b600160ff1b821460001984141615611f6b57611f6b612245565b500590565b600082611f7f57611f7f61225b565b500490565b600181815b80851115611fbf578160001904821115611fa557611fa5612245565b80851615611fb257918102915b93841c9390800290611f89565b509250929050565b6000610e5a60ff841683600082611fe05750600161043e565b81611fed5750600061043e565b8160018114612003576002811461200d57612029565b600191505061043e565b60ff84111561201e5761201e612245565b50506001821b61043e565b5060208310610133831016604e8410600b841016171561204c575081810a61043e565b6120568383611f84565b806000190482111561206a5761206a612245565b029392505050565b60006001600160ff1b0360008413600084138583048511828216161561209a5761209a612245565b600160ff1b60008712868205881281841616156120b9576120b9612245565b600087129250878205871284841616156120d5576120d5612245565b878505871281841616156120eb576120eb612245565b505050929093029392505050565b600081600019048311821515161561211357612113612245565b500290565b600063ffffffff8083168185168183048111821515161561213b5761213b612245565b02949350505050565b600080831283600160ff1b0183128115161561216257612162612245565b836001600160ff1b0301831381161561217d5761217d612245565b50500390565b60008282101561219557612195612245565b500390565b600063ffffffff838116908316818110156121b7576121b7612245565b039392505050565b600060ff821660ff8416808210156121d9576121d9612245565b90039392505050565b60005b838110156121fd5781810151838201526020016121e5565b838111156105455750506000910152565b60008261221d5761221d61225b565b500690565b600063ffffffff808416806122395761223961225b565b92169190910692915050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea164736f6c6343000807000a";

type SpritzSmartPayConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SpritzSmartPayConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SpritzSmartPay__factory extends ContractFactory {
  constructor(...args: SpritzSmartPayConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    spritzPay: PromiseOrValue<string>,
    autoTaskWallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SpritzSmartPay> {
    return super.deploy(
      spritzPay,
      autoTaskWallet,
      overrides || {}
    ) as Promise<SpritzSmartPay>;
  }
  override getDeployTransaction(
    spritzPay: PromiseOrValue<string>,
    autoTaskWallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      spritzPay,
      autoTaskWallet,
      overrides || {}
    );
  }
  override attach(address: string): SpritzSmartPay {
    return super.attach(address) as SpritzSmartPay;
  }
  override connect(signer: Signer): SpritzSmartPay__factory {
    return super.connect(signer) as SpritzSmartPay__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpritzSmartPayInterface {
    return new utils.Interface(_abi) as SpritzSmartPayInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SpritzSmartPay {
    return new Contract(address, _abi, signerOrProvider) as SpritzSmartPay;
  }
}