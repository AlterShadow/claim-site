import logo from './logo.svg';
import './App.css';
import { useAddress ,useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import FritzV2Contract from './FritzTheCoin.json';

const contractAddress = "0x061fbb935Bba94224d1D9732BCc13832f6A4DDaE";

function App() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, "token");
  const { mutateAsync, isLoading, error } = useContractWrite(contract, "migrateToV2");

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
                      <div className="flex justify-center w-full"><span className="bg-blue-100 text-blue-600 tracking-widest uppercase rounded-full px-4 py-2 text-xs font-bold leading-5">$MMM - FIND&nbsp;AND&nbsp;BUY&nbsp;MEMES&nbsp;YOU&nbsp;LOVE</span></div>
                      <h1 className="text-gray-100 tracking-tighter mt-0 mb-0 text-6xl font-bold leading-tight text-center">🚀 Fritz V1 -{">"} Fritz V2</h1>
                      <p className="text-xl leading-relaxed text-center text-gray-300">You need to know someone that knows someone to buy the $MMM token. Chad VIPS only. Join our telegram to learn mow</p>
                      <div className="flex flex-wrap p-5 justify-center md:space-x-10 ">
                        {/* <button className="border-0 mt-2  border-blue-500 rounded-full w-48 h-12 transition duration-75 text-white bg-violet-900 hover:bg-blue-400 hover:text-white hover:border-2">
                          <span className=" font-bold text-lg lg:text-xl">Connect Wallet</span>
                        </button> */}
                        <Web3Button
                          contractAddress="0x061fbb935Bba94224d1D9732BCc13832f6A4DDaE"
                          contractAbi={FritzV2Contract.abi}
                          action={() => mutateAsync({ args: [1000]})}
                        >
                          Claim
                        </Web3Button>
                        {address}
                        {/* <ConnectWallet
                          btnTitle="Connect Wallet"
                        /> */}
                      </div>
                  </div>
              </section>
          </div>
      </div>
    </div>
  );
}

export default App;
