/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  SpritzReceiver,
  SpritzReceiverInterface,
} from "../SpritzReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spritzPay",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_accountReference",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotController",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "EtherReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "inputTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "swapData",
        type: "bytes",
      },
    ],
    name: "payWithNativeSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sourceTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceTokenAmountMax",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paymentTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "swapData",
        type: "bytes",
      },
    ],
    name: "payWithSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "payWithToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "sweep",
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
  "0x60e0604052604051610bcc380380610bcc83398101604081905261002291610061565b6001600160601b0319606093841b811660c0529190921b1660a05260805261009d565b80516001600160a01b038116811461005c57600080fd5b919050565b60008060006060848603121561007657600080fd5b61007f84610045565b925061008d60208501610045565b9150604084015190509250925092565b60805160a05160601c60c05160601c610abb6101116000396000818161012301528181610267015281816103b101526104e10152600081816101b7015281816103390152818161044e015281816106cb01526107950152600081816101e80152818161031301526104810152610abb6000f3fe6080604052600436106100435760003560e01c8063026b04261461008b578063659bd43e146100ab578063a900a778146100cb578063b8dc491b146100eb57600080fd5b366100865734156100845760405134815233907f1e57e3bb474320be3d2c77138f75b7c3941292d647f5f9634e33a8e94e0e069b9060200160405180910390a25b005b600080fd5b34801561009757600080fd5b506100846100a6366004610959565b61010b565b3480156100b757600080fd5b506100846100c6366004610914565b61024f565b3480156100d757600080fd5b506100846100e636600461083f565b610399565b3480156100f757600080fd5b506100846101063660046108db565b6104c9565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461017a576040517f23019e6700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f2ba6409200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690632ba640929086906102169089907f000000000000000000000000000000000000000000000000000000000000000090899089908990600401610a58565b6000604051808303818588803b15801561022f57600080fd5b505af1158015610243573d6000803e3d6000fd5b50505050505050505050565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146102be576040517f23019e6700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102c782610688565b6040517fd71d963200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8381166004830152602482018390527f000000000000000000000000000000000000000000000000000000000000000060448301527f0000000000000000000000000000000000000000000000000000000000000000169063d71d963290606401600060405180830381600087803b15801561037d57600080fd5b505af1158015610391573d6000803e3d6000fd5b505050505050565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610408576040517f23019e6700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61041186610688565b6040517f3f03d7ff00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690633f03d7ff906104af908990899089907f0000000000000000000000000000000000000000000000000000000000000000908a908a908a90600401610a03565b600060405180830381600087803b15801561022f57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610538576040517f23019e6700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff83169063a9059cbb90839083906370a082319060240160206040518083038186803b1580156105a757600080fd5b505afa1580156105bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105df9190610940565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff909216600483015260248201526044015b602060405180830381600087803b15801561064b57600080fd5b505af115801561065f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068391906108b2565b505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000811660248301526000919083169063dd62ed3e9060440160206040518083038186803b15801561071957600080fd5b505afa15801561072d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107519190610940565b9050806107f2576040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000811660048301527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff602483015283169063095ea7b390604401610631565b5050565b60008083601f84011261080857600080fd5b50813567ffffffffffffffff81111561082057600080fd5b60208301915083602082850101111561083857600080fd5b9250929050565b60008060008060008060a0878903121561085857600080fd5b863561086381610a89565b9550602087013594506040870135935060608701359250608087013567ffffffffffffffff81111561089457600080fd5b6108a089828a016107f6565b979a9699509497509295939492505050565b6000602082840312156108c457600080fd5b815180151581146108d457600080fd5b9392505050565b600080604083850312156108ee57600080fd5b82356108f981610a89565b9150602083013561090981610a89565b809150509250929050565b6000806040838503121561092757600080fd5b823561093281610a89565b946020939093013593505050565b60006020828403121561095257600080fd5b5051919050565b60008060008060006080868803121561097157600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561099d57600080fd5b6109a9888289016107f6565b969995985093965092949392505050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b73ffffffffffffffffffffffffffffffffffffffff8816815286602082015285604082015284606082015283608082015260c060a08201526000610a4b60c0830184866109ba565b9998505050505050505050565b858152846020820152836040820152608060608201526000610a7e6080830184866109ba565b979650505050505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610aab57600080fd5b5056fea164736f6c6343000807000a";

type SpritzReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SpritzReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SpritzReceiver__factory extends ContractFactory {
  constructor(...args: SpritzReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _controller: PromiseOrValue<string>,
    _spritzPay: PromiseOrValue<string>,
    _accountReference: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<SpritzReceiver> {
    return super.deploy(
      _controller,
      _spritzPay,
      _accountReference,
      overrides || {}
    ) as Promise<SpritzReceiver>;
  }
  override getDeployTransaction(
    _controller: PromiseOrValue<string>,
    _spritzPay: PromiseOrValue<string>,
    _accountReference: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _controller,
      _spritzPay,
      _accountReference,
      overrides || {}
    );
  }
  override attach(address: string): SpritzReceiver {
    return super.attach(address) as SpritzReceiver;
  }
  override connect(signer: Signer): SpritzReceiver__factory {
    return super.connect(signer) as SpritzReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpritzReceiverInterface {
    return new utils.Interface(_abi) as SpritzReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SpritzReceiver {
    return new Contract(address, _abi, signerOrProvider) as SpritzReceiver;
  }
}
