/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, type Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Polysum,
  PolysumInterface,
} from "../../../../@unirep/contracts/libraries/Polysum";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "R",
        type: "uint256",
      },
    ],
    name: "rForIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "xx",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x610f8c610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c806358ff5f2d1461005b5780635aa38bc71461009857806389e058fb146100c1578063b9357662146100ea575b600080fd5b81801561006757600080fd5b50610082600480360381019061007d9190610954565b61011a565b60405161008f9190610bf7565b60405180910390f35b8180156100a457600080fd5b506100bf60048036038101906100ba91906108ed565b610276565b005b8180156100cd57600080fd5b506100e860048036038101906100e391906109a3565b6104bf565b005b61010460048036038101906100ff9190610a1a565b6107a2565b6040516101119190610bf7565b60405180910390f35b60007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001831061017e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017590610b97565b60405180910390fd5b600084600101600081548092919061019590610d50565b91905055905060006101a782856107a2565b905060007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000180610200577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b86830990507f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061025a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8188600001540887600001819055508293505050509392505050565b60ff80168251106102bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102b390610b77565b60405180910390fd5b6000825111610300576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f790610b57565b60405180910390fd5b600083600101549050600084600001549050600061031e83856107a2565b905060005b85518160ff1610156104a45760007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000180610386577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b878360ff16815181106103c2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151840990507f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000180610423577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8185089350848061043390610d50565b9550507f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061048b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b868409925050808061049c90610d99565b915050610323565b50818660000181905550828660010181905550505050505050565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018310610521576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051890610b37565b60405180910390fd5b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018210610583576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057a90610bb7565b60405180910390fd5b846001015484106105c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c090610bd7565b60405180910390fd5b60006105d585836107a2565b905060007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061062e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b858309905060007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061068a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b858409905060008183116106a95782826106a49190610cca565b6106b6565b81836106b59190610cca565b5b90506000896000015490508383111561072e577f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018061071e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8282088a60000181905550610796565b80821161075557818a60000160008282546107499190610cca565b92505081905550610795565b80826107619190610cca565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000161078c9190610cca565b8a600001819055505b5b50505050505050505050565b6000808314156107b457819050610827565b60007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001905060006001856107e89190610c74565b905060405160208152602080820152602060408201528460608201528160808201528260a082015260208160c08360056107d05a03fa81519450505050505b92915050565b600061084061083b84610c37565b610c12565b9050808382526020820190508285602086028201111561085f57600080fd5b60005b8581101561088f578161087588826108d8565b845260208401935060208301925050600181019050610862565b5050509392505050565b600082601f8301126108aa57600080fd5b81356108ba84826020860161082d565b91505092915050565b6000813590506108d281610f28565b92915050565b6000813590506108e781610f3f565b92915050565b60008060006060848603121561090257600080fd5b6000610910868287016108c3565b935050602084013567ffffffffffffffff81111561092d57600080fd5b61093986828701610899565b925050604061094a868287016108d8565b9150509250925092565b60008060006060848603121561096957600080fd5b6000610977868287016108c3565b9350506020610988868287016108d8565b9250506040610999868287016108d8565b9150509250925092565b600080600080600060a086880312156109bb57600080fd5b60006109c9888289016108c3565b95505060206109da888289016108d8565b94505060406109eb888289016108d8565b93505060606109fc888289016108d8565b9250506080610a0d888289016108d8565b9150509295509295909350565b60008060408385031215610a2d57600080fd5b6000610a3b858286016108d8565b9250506020610a4c858286016108d8565b9150509250929050565b6000610a63600683610c63565b9150610a6e82610e32565b602082019050919050565b6000610a86600683610c63565b9150610a9182610e5b565b602082019050919050565b6000610aa9600683610c63565b9150610ab482610e84565b602082019050919050565b6000610acc600683610c63565b9150610ad782610ead565b602082019050919050565b6000610aef600683610c63565b9150610afa82610ed6565b602082019050919050565b6000610b12600683610c63565b9150610b1d82610eff565b602082019050919050565b610b3181610d08565b82525050565b60006020820190508181036000830152610b5081610a56565b9050919050565b60006020820190508181036000830152610b7081610a79565b9050919050565b60006020820190508181036000830152610b9081610a9c565b9050919050565b60006020820190508181036000830152610bb081610abf565b9050919050565b60006020820190508181036000830152610bd081610ae2565b9050919050565b60006020820190508181036000830152610bf081610b05565b9050919050565b6000602082019050610c0c6000830184610b28565b92915050565b6000610c1c610c2d565b9050610c288282610d1f565b919050565b6000604051905090565b600067ffffffffffffffff821115610c5257610c51610df2565b5b602082029050602081019050919050565b600082825260208201905092915050565b6000610c7f82610d08565b9150610c8a83610d08565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610cbf57610cbe610dc3565b5b828201905092915050565b6000610cd582610d08565b9150610ce083610d08565b925082821015610cf357610cf2610dc3565b5b828203905092915050565b6000819050919050565b6000819050919050565b600060ff82169050919050565b610d2882610e21565b810181811067ffffffffffffffff82111715610d4757610d46610df2565b5b80604052505050565b6000610d5b82610d08565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610d8e57610d8d610dc3565b5b600182019050919050565b6000610da482610d12565b915060ff821415610db857610db7610dc3565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f6f6669656c640000000000000000000000000000000000000000000000000000600082015250565b7f61736d616c6c0000000000000000000000000000000000000000000000000000600082015250565b7f616c617267650000000000000000000000000000000000000000000000000000600082015250565b7f766c617267650000000000000000000000000000000000000000000000000000600082015250565b7f6e6669656c640000000000000000000000000000000000000000000000000000600082015250565b7f75696e6465780000000000000000000000000000000000000000000000000000600082015250565b610f3181610cfe565b8114610f3c57600080fd5b50565b610f4881610d08565b8114610f5357600080fd5b5056fea264697066735822122027f833ac30f3da0bdbee4108f0f0eb042eebeafd72bfa4465fcc00b5257b6a9b64736f6c63430008040033";

type PolysumConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PolysumConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Polysum__factory extends ContractFactory {
  constructor(...args: PolysumConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Polysum> {
    return super.deploy(overrides || {}) as Promise<Polysum>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Polysum {
    return super.attach(address) as Polysum;
  }
  override connect(signer: Signer): Polysum__factory {
    return super.connect(signer) as Polysum__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PolysumInterface {
    return new utils.Interface(_abi) as PolysumInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Polysum {
    return new Contract(address, _abi, signerOrProvider) as Polysum;
  }
}
