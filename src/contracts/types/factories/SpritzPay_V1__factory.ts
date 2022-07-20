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
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
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
    inputs: [
      {
        internalType: "address",
        name: "_swapRouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wrappedEtherAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sourceTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_paymentTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sourceTokenAmountMax",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_path",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_paymentReference",
        type: "bytes32",
      },
    ],
    name: "payWithNative",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sourceTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paymentTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_paymentTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sourceTokenAmountMax",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_path",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_paymentReference",
        type: "bytes32",
      },
    ],
    name: "payWithSwap",
    outputs: [
      {
        internalType: "uint256",
        name: "sourceTokenSpent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
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
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611796806100206000396000f3fe60806040526004361061007f5760003560e01c80637c510b821161004e5780637c510b82146100f55780638da5cb5b14610128578063c31c9c071461015a578063f2fde38b1461017a57600080fd5b8063485cc9551461008b57806358fb6fac146100ad578063715018a6146100cd57806375484388146100e257600080fd5b3661008657005b600080fd5b34801561009757600080fd5b506100ab6100a63660046114f9565b61019a565b005b3480156100b957600080fd5b506100ab6100c836600461152c565b610311565b3480156100d957600080fd5b506100ab6103df565b6100ab6100f036600461156e565b6103f3565b34801561010157600080fd5b5061011561011036600461156e565b61061b565b6040519081526020015b60405180910390f35b34801561013457600080fd5b506033546001600160a01b03165b6040516001600160a01b03909116815260200161011f565b34801561016657600080fd5b50606654610142906001600160a01b031681565b34801561018657600080fd5b506100ab61019536600461162f565b610848565b600054610100900460ff16158080156101ba5750600054600160ff909116105b806101d45750303b1580156101d4575060005460ff166001145b61024b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084015b60405180910390fd5b6000805460ff19166001179055801561026e576000805461ff0019166101001790555b6066805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03851617905561029e6108d8565b6065805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038416179055801561030c576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6040516323b872dd60e01b81523360048201526001600160a01b0385811660248301526044820184905284916000918316906323b872dd906064016020604051808303816000875af115801561036b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038f9190611651565b9050806103c957604051630d88598b60e41b81526001600160a01b0380871660048301528716602482015260448101859052606401610242565b6103d786868688888861094b565b505050505050565b6103e76109b9565b6103f16000610a13565b565b8334146104425760405162461bcd60e51b815260206004820152601060248201527f4e6f7420656e6f756768204574686572000000000000000000000000000000006044820152606401610242565b6065546001600160a01b0388811691161461049f5760405162461bcd60e51b815260206004820152601c60248201527f496e76616c696420736f7572636520746f6b656e2061646472657373000000006044820152606401610242565b6104a7610a72565b60665484906104c09030906001600160a01b0316610ad1565b10156104db576065546104db906001600160a01b0316610c0c565b6040805160c06020601f8601819004028201810190925260a0810184815260009282919087908790819085018382808284376000920191909152505050908252506001600160a01b038b16602082015260400161053942603c611689565b81526020810188905260409081018790526066549051631e51809360e31b81529192506000916001600160a01b039091169063f28c04989061057f9085906004016116cd565b6020604051808303816000875af115801561059e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c2919061173d565b905060006105d08288611756565b6065546066549192506105f1916001600160a01b0391821691166000610c32565b80156106005761060081610d32565b61060e8b8b848c8c8961094b565b5050505050505050505050565b604051636eb1769f60e11b8152336004820152306024820152600090889086906001600160a01b0383169063dd62ed3e90604401602060405180830381865afa15801561066c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610690919061173d565b10156107045760405162461bcd60e51b815260206004820152602760248201527f496e73756666696369656e7420616c6c6f77616e636520666f7220737761702060448201527f746f207061792e000000000000000000000000000000000000000000000000006064820152608401610242565b61070e8987610dd7565b6040805160c06020601f8801819004028201810190925260a0810186815260009282919089908990819085018382808284376000920191909152505050908252506001600160a01b038d16602082015260400161076c42603c611689565b8152602081018a905260409081018990526066549051631e51809360e31b81529192506001600160a01b03169063f28c0498906107ad9084906004016116cd565b6020604051808303816000875af11580156107cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f0919061173d565b925060006107fe8489611756565b60665490915061081a908c906001600160a01b03166000610c32565b801561082b5761082b8b3383610f10565b6108398c8c868d8d8a61094b565b50505098975050505050505050565b6108506109b9565b6001600160a01b0381166108cc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610242565b6108d581610a13565b50565b600054610100900460ff166109435760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610242565b6103f1611009565b604080516001600160a01b03888116825233602083015287811682840152606082018790528516608082015260a0810184905260c0810183905290517f2415a5b602fd0082bd30dae862c30bbf8abbfcf39db48726b2d8ef555ee1abde9181900360e00190a1505050505050565b6033546001600160a01b031633146103f15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610242565b603380546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610a7a61107d565b34610a843061115b565b146103f15760405162461bcd60e51b815260206004820152601260248201527f4e61746976652077726170206661696c656400000000000000000000000000006044820152606401610242565b604080516001600160a01b03848116602483015283811660448084019190915283518084039091018152606490920183526020820180516001600160e01b0316636eb1769f60e11b179052606554925160009384928392911690610b3690859061176d565b600060405180830381855afa9150503d8060008114610b71576040519150601f19603f3d011682016040523d82523d6000602084013e610b76565b606091505b509150915081610bee5760405162461bcd60e51b815260206004820152602960248201527f57453a204661696c656420746f20676574207772617070656420746f6b656e2060448201527f616c6c6f77616e636500000000000000000000000000000000000000000000006064820152608401610242565b80806020019051810190610c02919061173d565b9695505050505050565b606654819060001990610c2c906001600160a01b03808516911683611273565b50505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b1790529151600092839290871691610c8e919061176d565b6000604051808303816000865af19150503d8060008114610ccb576040519150601f19603f3d011682016040523d82523d6000602084013e610cd0565b606091505b5091509150818015610cfa575080511580610cfa575080806020019051810190610cfa9190611651565b610d2b5760405162461bcd60e51b8152602060048201526002602482015261534160f01b6044820152606401610242565b5050505050565b610d3b8161133c565b604051600090339083908381818185875af1925050503d8060008114610d7d576040519150601f19603f3d011682016040523d82523d6000602084013e610d82565b606091505b5050905080610dd35760405162461bcd60e51b815260206004820152601e60248201527f4661696c656420746f2072657475726e2045746865722062616c616e636500006044820152606401610242565b5050565b606654604051636eb1769f60e11b81523060048201526001600160a01b039182166024820152839183919083169063dd62ed3e90604401602060405180830381865afa158015610e2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4f919061173d565b1015610e5e57610e5e83610c0c565b6040516323b872dd60e01b8152336004820152306024820152604481018390526000906001600160a01b038316906323b872dd906064016020604051808303816000875af1158015610eb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed89190611651565b905080610c2c57604051630d88598b60e41b81526001600160a01b038516600482015230602482015260448101849052606401610242565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b1790529151600092839290871691610f6c919061176d565b6000604051808303816000865af19150503d8060008114610fa9576040519150601f19603f3d011682016040523d82523d6000602084013e610fae565b606091505b5091509150818015610fd8575080511580610fd8575080806020019051810190610fd89190611651565b610d2b5760405162461bcd60e51b815260206004820152600260248201526114d560f21b6044820152606401610242565b600054610100900460ff166110745760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610242565b6103f133610a13565b60408051600481526024810182526020810180516001600160e01b0316630d0e30db60e41b179052606554915190916000916001600160a01b039091169034906110c890859061176d565b60006040518083038185875af1925050503d8060008114611105576040519150601f19603f3d011682016040523d82523d6000602084013e61110a565b606091505b5050905080610dd35760405162461bcd60e51b815260206004820152601b60248201527f57453a204661696c656420746f206465706f73697420457468657200000000006044820152606401610242565b604080516001600160a01b0383811660248084019190915283518084039091018152604490920183526020820180516001600160e01b03166370a0823160e01b1790526065549251600093849283929116906111b890859061176d565b600060405180830381855afa9150503d80600081146111f3576040519150601f19603f3d011682016040523d82523d6000602084013e6111f8565b606091505b5091509150816112565760405162461bcd60e51b8152602060048201526024808201527f57453a204661696c656420746f206765742062616c616e6365206f66206163636044820152631bdd5b9d60e21b6064820152608401610242565b8080602001905181019061126a919061173d565b95945050505050565b6040516001600160a01b03838116602483015260448201839052600091829182919087169060640160408051601f198184030181529181526020820180516001600160e01b031663095ea7b360e01b179052516112d0919061176d565b6000604051808303816000865af19150503d806000811461130d576040519150601f19603f3d011682016040523d82523d6000602084013e611312565b606091505b5091509150818015610c02575080511580610c02575080806020019051810190610c029190611651565b476113468261139e565b816113518247611756565b14610dd35760405162461bcd60e51b815260206004820152601f60248201527f4661696c656420746f207769746864726177206e617469766520746f6b656e006044820152606401610242565b60007f2e1a7d4d13322e7b96f9a57413e1525c250fb7a9021cf91d1540d5b69f16a49f826040516024016113d491815260200190565b60408051601f198184030181529181526020820180516001600160e01b03167fffffffff000000000000000000000000000000000000000000000000000000009094169390931790925260655491519092506000916001600160a01b03169061143e90849061176d565b6000604051808303816000865af19150503d806000811461147b576040519150601f19603f3d011682016040523d82523d6000602084013e611480565b606091505b505090508061030c5760405162461bcd60e51b8152602060048201526024808201527f57453a204661696c656420746f20776974686472617720746f6b656e2062616c604482015263616e636560e01b6064820152608401610242565b80356001600160a01b03811681146114f457600080fd5b919050565b6000806040838503121561150c57600080fd5b611515836114dd565b9150611523602084016114dd565b90509250929050565b6000806000806080858703121561154257600080fd5b61154b856114dd565b9350611559602086016114dd565b93969395505050506040820135916060013590565b60008060008060008060008060e0898b03121561158a57600080fd5b611593896114dd565b97506115a160208a016114dd565b96506115af60408a016114dd565b9550606089013594506080890135935060a089013567ffffffffffffffff808211156115da57600080fd5b818b0191508b601f8301126115ee57600080fd5b8135818111156115fd57600080fd5b8c602082850101111561160f57600080fd5b60208301955080945050505060c089013590509295985092959890939650565b60006020828403121561164157600080fd5b61164a826114dd565b9392505050565b60006020828403121561166357600080fd5b8151801515811461164a57600080fd5b634e487b7160e01b600052601160045260246000fd5b6000821982111561169c5761169c611673565b500190565b60005b838110156116bc5781810151838201526020016116a4565b83811115610c2c5750506000910152565b602081526000825160a0602084015280518060c08501526116f58160e08601602085016116a1565b6001600160a01b0360208601511660408501526040850151606085015260608501516080850152608085015160a085015260e0601f19601f8301168501019250505092915050565b60006020828403121561174f57600080fd5b5051919050565b60008282101561176857611768611673565b500390565b6000825161177f8184602087016116a1565b919091019291505056fea164736f6c634300080d000a";

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