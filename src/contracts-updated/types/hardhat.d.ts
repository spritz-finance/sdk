/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import * as Contracts from ".";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AccessControlEnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlEnumerableUpgradeable__factory>;
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlEnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlEnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "IERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "AccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlEnumerable__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "IAccessControlEnumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlEnumerable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IUniswapV2Router01",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router01__factory>;
    getContractFactory(
      name: "IUniswapV2Router02",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router02__factory>;
    getContractFactory(
      name: "IUniswapV3SwapCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3SwapCallback__factory>;
    getContractFactory(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: "ISpritzSwapModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISpritzSwapModule__factory>;
    getContractFactory(
      name: "IWETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH9__factory>;
    getContractFactory(
      name: "SpritzPayV1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayV1__factory>;
    getContractFactory(
      name: "SpritzPayV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayV2__factory>;
    getContractFactory(
      name: "SpritzPayStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayStorage__factory>;
    getContractFactory(
      name: "SpritzPayStorageV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayStorageV2__factory>;
    getContractFactory(
      name: "SpritzPayStorageV3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayStorageV3__factory>;
    getContractFactory(
      name: "SpritzPayV3",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzPayV3__factory>;
    getContractFactory(
      name: "SpritzSmartPay",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzSmartPay__factory>;
    getContractFactory(
      name: "SpritzV2SwapModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzV2SwapModule__factory>;
    getContractFactory(
      name: "SpritzV3SwapModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpritzV3SwapModule__factory>;
    getContractFactory(
      name: "BytesAddressLibTest",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BytesAddressLibTest__factory>;
    getContractFactory(
      name: "MockToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockToken__factory>;
    getContractFactory(
      name: "TestDateValidation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestDateValidation__factory>;
    getContractFactory(
      name: "WETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETH9__factory>;

    getContractAt(
      name: "AccessControlEnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlEnumerableUpgradeable>;
    getContractAt(
      name: "AccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlEnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlEnumerableUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "PausableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableUpgradeable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "IERC20PermitUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20PermitUpgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "AccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlEnumerable>;
    getContractAt(
      name: "IAccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "IAccessControlEnumerable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlEnumerable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IUniswapV2Router01",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router01>;
    getContractAt(
      name: "IUniswapV2Router02",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router02>;
    getContractAt(
      name: "IUniswapV3SwapCallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    getContractAt(
      name: "ISwapRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: "ISpritzSwapModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISpritzSwapModule>;
    getContractAt(
      name: "IWETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH9>;
    getContractAt(
      name: "SpritzPayV1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayV1>;
    getContractAt(
      name: "SpritzPayV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayV2>;
    getContractAt(
      name: "SpritzPayStorage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayStorage>;
    getContractAt(
      name: "SpritzPayStorageV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayStorageV2>;
    getContractAt(
      name: "SpritzPayStorageV3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayStorageV3>;
    getContractAt(
      name: "SpritzPayV3",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzPayV3>;
    getContractAt(
      name: "SpritzSmartPay",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzSmartPay>;
    getContractAt(
      name: "SpritzV2SwapModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzV2SwapModule>;
    getContractAt(
      name: "SpritzV3SwapModule",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SpritzV3SwapModule>;
    getContractAt(
      name: "BytesAddressLibTest",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BytesAddressLibTest>;
    getContractAt(
      name: "MockToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockToken>;
    getContractAt(
      name: "TestDateValidation",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestDateValidation>;
    getContractAt(
      name: "WETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETH9>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}