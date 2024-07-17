/* eslint-disable react/prop-types */
import { MdDownloadDone, MdPendingActions } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";

const StatusProgress = ({stage}) => {
    const activeProcessing = stage === 'processing' || stage == 'completed';
    return (
        <div className="flex gap-1 justify-center items-center xs:px-5 pb-5">
        <div className="size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative bg-primary text-white">
            <p className="text-2xl xs:text-3xl sm:text-4xl "><MdPendingActions /></p>
            <p className="absolute bottom-[-25px] text-sm font-medium text-black">Pending</p>
        </div>
        <div className="flex items-center gap-1">
            <div className={`w-10 h-[5px] xs:w-20 xs:h-1.5 sm:w-28 sm:h-2 border border-primary rounded-full ${activeProcessing && 'bg-primary'}`}>

            </div>
            <div className={`size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative ${activeProcessing && 'bg-primary text-white'}`}>
                <p className="text-2xl xs:text-3xl sm:text-4xl"><RiProgress3Line /></p>
                <p className="absolute bottom-[-25px] text-sm font-medium text-black">Processing</p>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <div className={`w-10 h-[5px] xs:w-20 xs:h-1.5 sm:w-28 sm:h-2 border border-primary rounded-full ${stage==='completed' && 'bg-primary'}`}></div>
            <div className={`size-12 sm:size-16 border-primary rounded-full border flex justify-center items-center relative ${stage==='completed' && 'bg-primary text-white'}`}>
                <p className="text-2xl xs:text-3xl sm:text-4xl"><MdDownloadDone /></p>
                <p className="absolute bottom-[-25px] text-sm font-medium text-black">Complete</p>
            </div>
        </div>
    </div>
    );
};

export default StatusProgress;