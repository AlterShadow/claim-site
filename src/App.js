import { useAddress, useBalance  ,useContract,useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import MirgrationContract from './MigrateToFritzV2.json';
import Holderlists from './Holderlist.json'
import { useState,useEffect} from 'react';

const migrateAddress = "0x6f7C9ff620d49881b0F09c437c4C7bac88658766";
function App() {
  const address = useAddress();
  const { contract: migrateContract, isLoading:isMigrateLoading } = useContract(migrateAddress, MirgrationContract.abi);
  const { data: migrateData} = useContractRead(migrateContract, "claim_list",[address]);
  const { mutateAsync:migrateToFrtizV2 } = useContractWrite(migrateContract, "migrateToFrtizV2");

  const [claimData, setClaimData] = useState([]);
  // console.log(FritzV2Contract.abi);
  // const { contract } = useContract("0xf2eD433278f3566173BD674E83D7eD02b215cDA2", "token", FritzV2Contract.abi);
  // console.log(contract);
  // const { data, isLoading, error } = useContractRead(contract, "MMMPotFee");
  // console.log(data);
  useEffect(() => {
      ///Connect Wallet
      // This code will be executed only once, similar to componentDidMount
      //this.interval = setInterval (() => this. fetchCurrencyData (), 60 *1000)   
      
      return () => {
        // This code will be executed just before unmounting the component, similar to componentWillUnmount
      };
  }, []); 
  console.log(migrateData);
  if(!isMigrateLoading)
  {
    const hLists = Holderlists.Holders;
    hLists.map((item) => {
      console.log("(", claimData.value, ",", item.value, ")");
      if(address == item.address && !migrateData && claimData.value!=item.value) {
          setClaimData(item);
      }
    })
  }
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
                          contractAddress={migrateAddress}
                          contractAbi={ MirgrationContract.abi}
                          action={() => {
                            migrateToFrtizV2({ args: [claimData.value]});
                          }}  
                        >
                          Claim
                        </Web3Button>
                   
                        {/* <ConnectWallet
                          btnTitle="Connect Wallet"
                        /> */}
                      </div>
                      <div className="text-white text-xl text-center">{address}</div>
                      <div className="text-white text-xl text-center">You can claim {(claimData!=undefined)?claimData.value:0} $Fritz Tokens</div>
                  </div>
              </section>
          </div>
      </div>
    </div>
  );
}

export default App;
