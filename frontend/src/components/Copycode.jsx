// import React, { useState } from 'react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const Copycode = () => {
//     const codeString = 'kya hi likhu ismey';
//     const [copy,setCopy]=useState(false);
//   return (
//     <div className='max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
//     <div className='flex justify-between px-4 text-white text-xs items-center'>
//         <p className='text-sm'>code you should follow:</p>
//         {
//             copy? (<button className='py-1 inline-flex items-center gap-1'>
//             <span className='text-base mt-1'><ion-icon name="checkmark-sharp"></ion-icon></span>
            
//             Copied!!
//         </button>):(<button className='py-1 inline-flex items-center gap-1' onClick={()=>{
//             navigator.clipboard.writeText(codeString);
//             setCopy(true);
//             setTimeout(()=>{
//                 setCopy(false);
//             },300)
//         }}>
//             <span className='text-base mt-1'><ion-icon name="clipboard-outline"></ion-icon></span>
            
//             Copy code
//         </button>)
//         }
//     </div>

// <SyntaxHighlighter language="linux" style={atomOneDark} customStyle={{padding:"25px"}}>
// {codeString}
// </SyntaxHighlighter>
// </div>
//   )
// }

// export default Copycode
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";

const Copycode = ({inputText}) => {

    const codeString = `${inputText}`;
    const [copy, setCopy] = useState(false);

    return (
        <div className='max-w-7xl min-w-[25rem] rounded-md overflow-hidden bg-glass'>
            <div className='flex justify-between px-4 text-white text-xs items-center'>
                <p className='text-sm'>code you should follow (eg.):</p>
                {copy ? (
                    <button className='py-1 inline-flex items-center gap-1'>
                        <span className='text-base mt-1'><TbCopyCheck /></span>
                        Copied!!
                    </button>
                ) : (
                    <button
                        className='py-1 inline-flex items-center gap-1'
                        onClick={() => {
                            navigator.clipboard.writeText(codeString);
                            setCopy(true);
                            setTimeout(() => {
                                setCopy(false);
                            }, 300);
                        }}
                    >
                        <span className='text-base mt-1'><TbCopy /></span>
                        Copy code
                    </button>
                )}
            </div>

            <SyntaxHighlighter language="linux" style={atomOneDark} customStyle={{ padding: "25px" } }>
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
}

export default Copycode;



