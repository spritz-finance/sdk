/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface TestDateValidationInterface extends utils.Interface {
  functions: {
    "monthlyValidation(uint256,uint256,uint128)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "monthlyValidation"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "monthlyValidation",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "monthlyValidation",
    data: BytesLike
  ): Result;

  events: {};
}

export interface TestDateValidation extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestDateValidationInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    monthlyValidation(
      startTime: PromiseOrValue<BigNumberish>,
      currentTime: PromiseOrValue<BigNumberish>,
      paymentAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  monthlyValidation(
    startTime: PromiseOrValue<BigNumberish>,
    currentTime: PromiseOrValue<BigNumberish>,
    paymentAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    monthlyValidation(
      startTime: PromiseOrValue<BigNumberish>,
      currentTime: PromiseOrValue<BigNumberish>,
      paymentAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    monthlyValidation(
      startTime: PromiseOrValue<BigNumberish>,
      currentTime: PromiseOrValue<BigNumberish>,
      paymentAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    monthlyValidation(
      startTime: PromiseOrValue<BigNumberish>,
      currentTime: PromiseOrValue<BigNumberish>,
      paymentAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}