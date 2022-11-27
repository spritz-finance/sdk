/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  SpritzPayStorage,
  SpritzPayStorageInterface,
} from "../../../contracts/lib/SpritzPayStorage";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "NonAcceptedToken",
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
        name: "token",
        type: "address",
      },
    ],
    name: "PaymentTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "PaymentTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptedPaymentTokens",
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
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [],
    name: "paymentRecipient",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "swapTarget",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610cab806100206000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80639010d07c1161008c578063aa2aedc411610066578063aa2aedc4146101ef578063ca15c87314610204578063d547741f14610217578063e63ab1e91461022a57600080fd5b80639010d07c1461019b57806391d14854146101ae578063a217fddf146101e757600080fd5b80632f2ff15d116100bd5780632f2ff15d1461016257806336568abe146101775780637e7f0cde1461018a57600080fd5b806301ffc9a7146100e4578063248a9ca31461010c5780632b1eaf291461013d575b600080fd5b6100f76100f2366004610a86565b610251565b60405190151581526020015b60405180910390f35b61012f61011a366004610a0f565b60009081526065602052604090206001015490565b604051908152602001610103565b60c9546001600160a01b03165b6040516001600160a01b039091168152602001610103565b610175610170366004610a28565b610295565b005b610175610185366004610a28565b6102bf565b60ca546001600160a01b031661014a565b61014a6101a9366004610a64565b610350565b6100f76101bc366004610a28565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61012f600081565b6101f761036f565b6040516101039190610b31565b61012f610212366004610a0f565b610380565b610175610225366004610a28565b610397565b61012f7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60006001600160e01b031982167f5a05180f00000000000000000000000000000000000000000000000000000000148061028f575061028f826103bc565b92915050565b6000828152606560205260409020600101546102b081610423565b6102ba8383610430565b505050565b6001600160a01b03811633146103425760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b61034c8282610452565b5050565b60008281526097602052604081206103689083610474565b9392505050565b606061037b60cc610480565b905090565b600081815260976020526040812061028f9061048d565b6000828152606560205260409020600101546103b281610423565b6102ba8383610452565b60006001600160e01b031982167f7965db0b00000000000000000000000000000000000000000000000000000000148061028f57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b031983161461028f565b61042d8133610497565b50565b61043a8282610517565b60008281526097602052604090206102ba90826105b9565b61045c82826105ce565b60008281526097602052604090206102ba9082610651565b60006103688383610666565b6060600061036883610690565b600061028f825490565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff1661034c576104d5816001600160a01b031660146106ec565b6104e08360206106ec565b6040516020016104f1929190610ab0565b60408051601f198184030181529082905262461bcd60e51b825261033991600401610b7e565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff1661034c5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556105753390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610368836001600160a01b0384166108cd565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff161561034c5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610368836001600160a01b03841661091c565b600082600001828154811061067d5761067d610c72565b9060005260206000200154905092915050565b6060816000018054806020026020016040519081016040528092919081815260200182805480156106e057602002820191906000526020600020905b8154815260200190600101908083116106cc575b50505050509050919050565b606060006106fb836002610bc9565b610706906002610bb1565b67ffffffffffffffff81111561071e5761071e610c88565b6040519080825280601f01601f191660200182016040528015610748576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061077f5761077f610c72565b60200101906001600160f81b031916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106107ca576107ca610c72565b60200101906001600160f81b031916908160001a90535060006107ee846002610bc9565b6107f9906001610bb1565b90505b600181111561087e577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061083a5761083a610c72565b1a60f81b82828151811061085057610850610c72565b60200101906001600160f81b031916908160001a90535060049490941c9361087781610c2f565b90506107fc565b5083156103685760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610339565b60008181526001830160205260408120546109145750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561028f565b50600061028f565b60008181526001830160205260408120548015610a05576000610940600183610be8565b855490915060009061095490600190610be8565b90508181146109b957600086600001828154811061097457610974610c72565b906000526020600020015490508087600001848154811061099757610997610c72565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806109ca576109ca610c5c565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061028f565b600091505061028f565b600060208284031215610a2157600080fd5b5035919050565b60008060408385031215610a3b57600080fd5b8235915060208301356001600160a01b0381168114610a5957600080fd5b809150509250929050565b60008060408385031215610a7757600080fd5b50508035926020909101359150565b600060208284031215610a9857600080fd5b81356001600160e01b03198116811461036857600080fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610ae8816017850160208801610bff565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351610b25816028840160208801610bff565b01602801949350505050565b6020808252825182820181905260009190848201906040850190845b81811015610b725783516001600160a01b031683529284019291840191600101610b4d565b50909695505050505050565b6020815260008251806020840152610b9d816040850160208701610bff565b601f01601f19169190910160400192915050565b60008219821115610bc457610bc4610c46565b500190565b6000816000190483118215151615610be357610be3610c46565b500290565b600082821015610bfa57610bfa610c46565b500390565b60005b83811015610c1a578181015183820152602001610c02565b83811115610c29576000848401525b50505050565b600081610c3e57610c3e610c46565b506000190190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea164736f6c6343000807000a";

type SpritzPayStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SpritzPayStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SpritzPayStorage__factory extends ContractFactory {
  constructor(...args: SpritzPayStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SpritzPayStorage> {
    return super.deploy(overrides || {}) as Promise<SpritzPayStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SpritzPayStorage {
    return super.attach(address) as SpritzPayStorage;
  }
  override connect(signer: Signer): SpritzPayStorage__factory {
    return super.connect(signer) as SpritzPayStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpritzPayStorageInterface {
    return new utils.Interface(_abi) as SpritzPayStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SpritzPayStorage {
    return new Contract(address, _abi, signerOrProvider) as SpritzPayStorage;
  }
}
