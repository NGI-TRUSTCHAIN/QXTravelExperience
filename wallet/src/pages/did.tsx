import DIDLayout from "@/components/custom/did/did-layout";
import CreateDIDModal from "@/components/custom/modal/create-did-modal";
import NavbarLayout from "@/components/custom/navbar-layout";

const DIDPage = () => {
    return (
        <div className='bg-slate-200 min-h-screen max-w-screen-md m-auto flex flex-col'>
            <NavbarLayout
                actions={null}
                navigationLink={true}
            />
            <div className='flex-grow flex flex-col justify-between px-4'>

                <DIDLayout />
                <CreateDIDModal />
            </div>
        </div>
    )
}

export default DIDPage;