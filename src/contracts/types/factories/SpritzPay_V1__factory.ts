/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { SpritzPay_V1, SpritzPay_V1Interface } from "../SpritzPay_V1";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FailedTokenTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "SetZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
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
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sourceToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sourceTokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentTokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "paymentReference",
        type: "bytes32",
      },
    ],
    name: "Payment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "PaymentRecipientChanged",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "UpdateWETHAddress",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_paymentRecipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wethAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "paymentTokenAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "paymentReference",
        type: "bytes32",
      },
    ],
    name: "payWithToken",
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
        name: "newPaymentRecipient",
        type: "address",
      },
    ],
    name: "setPaymentRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRouterAddress",
        type: "address",
      },
    ],
    name: "setV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRouterAddress",
        type: "address",
      },
    ],
    name: "setV3Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newWETHAddress",
        type: "address",
      },
    ],
    name: "setWETHAddress",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x608060405234801561001057600080fd5b50610d34806100206000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80636a4234eb116100815780638da5cb5b1161005b5780638da5cb5b1461016d578063d71d963214610188578063f2fde38b1461019b57600080fd5b80636a4234eb1461014a578063715018a61461015d5780638456cb591461016557600080fd5b8063485cc955116100b2578063485cc955146101095780635c975abb1461011c5780635c9c030a1461013757600080fd5b806325fb6353146100d95780632983c4b8146100ee5780633f4ba83a14610101575b600080fd5b6100ec6100e7366004610c42565b6101ae565b005b6100ec6100fc366004610c42565b6101ff565b6100ec610213565b6100ec610117366004610c64565b610225565b60985460ff1660405190151581526020015b60405180910390f35b6100ec610145366004610c42565b6103b9565b6100ec610158366004610c42565b61040a565b6100ec610442565b6100ec610454565b6066546040516001600160a01b03909116815260200161012e565b6100ec610196366004610c97565b610464565b6100ec6101a9366004610c42565b6104dc565b6101b6610569565b6001600160a01b0381166101dd57604051631508131960e01b815260040160405180910390fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b610207610569565b610210816105c3565b50565b61021b610569565b610223610644565b565b603354610100900460ff16158080156102455750603354600160ff909116105b8061025f5750303b15801561025f575060335460ff166001145b6102d65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084015b60405180910390fd5b6033805460ff1916600117905580156102f9576033805461ff0019166101001790555b6001600160a01b03831661032057604051631508131960e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038516179055610343610696565b61034b610709565b61035361077c565b60fc80546001600160a01b0319166001600160a01b03841617905580156103b4576033805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6103c1610569565b6001600160a01b0381166103e857604051631508131960e01b815260040160405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b610412610569565b6001600160a01b03811661043957604051631508131960e01b815260040160405180910390fd5b610210816107ef565b61044a610569565b610223600061083a565b61045c610569565b61022361088c565b61046c6108c9565b82600061048a336000546001600160a01b038581169291168761091c565b9050806104c857600054604051630d88598b60e41b81526001600160a01b0380881660048301529091166024820152604481018590526064016102cd565b6104d58585878787610a0d565b5050505050565b6104e4610569565b6001600160a01b0381166105605760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016102cd565b6102108161083a565b6066546001600160a01b031633146102235760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102cd565b6001600160a01b0381166105ea57604051631508131960e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155604080519182523360208301527ff2aee2de2705c86bdfda6c3ddaddc83ce3b729f850c62f38aa6c9fc93158a5d491015b60405180910390a150565b61064c610a77565b6098805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b603354610100900460ff166107015760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b610223610ac9565b603354610100900460ff166107745760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b610223610b3d565b603354610100900460ff166107e75760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b610223610bb4565b60fc80546001600160a01b0319166001600160a01b0383161790556040513381527fb982ba6bb867a56a1acc799103a069bc45d1c122b90acc6cb7d1175f479b615090602001610639565b606680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6108946108c9565b6098805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586106793390565b60985460ff16156102235760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016102cd565b6040516001600160a01b038481166024830152838116604483015260648201839052600091829182919088169060840160408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b179052516109969190610cec565b6000604051808303816000865af19150503d80600081146109d3576040519150601f19603f3d011682016040523d82523d6000602084013e6109d8565b606091505b5091509150818015610a02575080511580610a02575080806020019051810190610a029190610cca565b979650505050505050565b600054604080516001600160a01b0392831681526020810187905285831681830152606081018590526080810184905290519187169133917f2415a5b602fd0082bd30dae862c30bbf8abbfcf39db48726b2d8ef555ee1abde919081900360a00190a35050505050565b60985460ff166102235760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016102cd565b603354610100900460ff16610b345760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b6102233361083a565b603354610100900460ff16610ba85760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b6098805460ff19169055565b603354610100900460ff16610c1f5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016102cd565b600160ca55565b80356001600160a01b0381168114610c3d57600080fd5b919050565b600060208284031215610c5457600080fd5b610c5d82610c26565b9392505050565b60008060408385031215610c7757600080fd5b610c8083610c26565b9150610c8e60208401610c26565b90509250929050565b600080600060608486031215610cac57600080fd5b610cb584610c26565b95602085013595506040909401359392505050565b600060208284031215610cdc57600080fd5b81518015158114610c5d57600080fd5b6000825160005b81811015610d0d5760208186018101518583015201610cf3565b81811115610d1c576000828501525b50919091019291505056fea164736f6c6343000807000a";

type SpritzPay_V1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SpritzPay_V1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SpritzPay_V1__factory extends ContractFactory {
  constructor(...args: SpritzPay_V1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SpritzPay_V1> {
    return super.deploy(overrides || {}) as Promise<SpritzPay_V1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SpritzPay_V1 {
    return super.attach(address) as SpritzPay_V1;
  }
  override connect(signer: Signer): SpritzPay_V1__factory {
    return super.connect(signer) as SpritzPay_V1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpritzPay_V1Interface {
    return new utils.Interface(_abi) as SpritzPay_V1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SpritzPay_V1 {
    return new Contract(address, _abi, signerOrProvider) as SpritzPay_V1;
  }
}
