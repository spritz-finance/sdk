/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  BytesAddressLibTest,
  BytesAddressLibTestInterface,
} from "../../../contracts/test/BytesAddressLibTest";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes",
      },
    ],
    name: "getFirstAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes",
      },
    ],
    name: "getLastAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytes",
        type: "bytes",
      },
    ],
    name: "toAddressArray",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610576806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806378082d7b14610046578063c93e76ad14610083578063fe3344e614610096575b600080fd5b610059610054366004610390565b6100b6565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b610059610091366004610390565b6100c7565b6100a96100a4366004610390565b6100d2565b60405161007a9190610441565b60006100c1826100dd565b92915050565b60006100c182610141565b60606100c1826101ac565b60006014825110156101365760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964206279746573206c656e67746800000000000000000000000060448201526064015b60405180910390fd5b6100c18260006102c0565b60006014825110156101955760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964206279746573206c656e677468000000000000000000000000604482015260640161012d565b6100c182601484516101a791906104e6565b6102c0565b6060601482516101bc91906104fd565b156102095760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964206279746573206c656e677468000000000000000000000000604482015260640161012d565b60006014835161021991906104b3565b90508067ffffffffffffffff81111561023457610234610553565b60405190808252806020026020018201604052801561025d578160200160208202803683370190505b50915060005b818110156102b95761027a846101a78360146104c7565b83828151811061028c5761028c61053d565b73ffffffffffffffffffffffffffffffffffffffff90921660209283029190910190910152600101610263565b5050919050565b6000816102ce81601461049b565b101561031c5760405162461bcd60e51b815260206004820152601260248201527f746f416464726573735f6f766572666c6f770000000000000000000000000000604482015260640161012d565b61032782601461049b565b835110156103775760405162461bcd60e51b815260206004820152601560248201527f746f416464726573735f6f75744f66426f756e64730000000000000000000000604482015260640161012d565b5001602001516c01000000000000000000000000900490565b6000602082840312156103a257600080fd5b813567ffffffffffffffff808211156103ba57600080fd5b818401915084601f8301126103ce57600080fd5b8135818111156103e0576103e0610553565b604051601f8201601f19908116603f0116810190838211818310171561040857610408610553565b8160405282815287602084870101111561042157600080fd5b826020860160208301376000928101602001929092525095945050505050565b6020808252825182820181905260009190848201906040850190845b8181101561048f57835173ffffffffffffffffffffffffffffffffffffffff168352928401929184019160010161045d565b50909695505050505050565b600082198211156104ae576104ae610511565b500190565b6000826104c2576104c2610527565b500490565b60008160001904831182151516156104e1576104e1610511565b500290565b6000828210156104f8576104f8610511565b500390565b60008261050c5761050c610527565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea164736f6c6343000807000a";

type BytesAddressLibTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BytesAddressLibTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BytesAddressLibTest__factory extends ContractFactory {
  constructor(...args: BytesAddressLibTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BytesAddressLibTest> {
    return super.deploy(overrides || {}) as Promise<BytesAddressLibTest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BytesAddressLibTest {
    return super.attach(address) as BytesAddressLibTest;
  }
  override connect(signer: Signer): BytesAddressLibTest__factory {
    return super.connect(signer) as BytesAddressLibTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BytesAddressLibTestInterface {
    return new utils.Interface(_abi) as BytesAddressLibTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BytesAddressLibTest {
    return new Contract(address, _abi, signerOrProvider) as BytesAddressLibTest;
  }
}
