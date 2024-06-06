import React, { useState } from "react";
import XLSX from "xlsx";


function Home() {
    const [fileName, setFileName] = useState(null);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const handleFile = async (e) => {
        const importRange = "A3:DH6";
        const headers = 1;
        const importRange1 = "B8:B130";
        const headers1 = "name";
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data, { sheetrows: 126});

        const worksheet = workbook.Sheets[workbook.SheetNames[1]];
        const worksheet1 = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: importRange, header: headers });
        const jsonData1 = XLSX.utils.sheet_to_json(worksheet1, { range: importRange1, header: headers1.replace('"','') });

        // setColumns(jsonData[1,2]);
        setRows(jsonData1);
        console.log(jsonData);
        console.log(jsonData1);
    
    };
    return (
        <div>
            {fileName && (
                <React.Fragment>
                    <p className="Pinpt">
                        Файл: <span>{fileName}</span>
                    </p>
                    <p className="Pcol">
                        Категорию: <select className="selCat">
                            {columns.map((c, key) => (
                                <option key={key} value={c}>{c}</option>
                            ))}
                        </select>
                    </p>
                </React.Fragment>
            )}
            <React.Fragment>
                <p className="Pcol1">
                    Категорию1: <select className="selCat1">
                        {rows.map((c, key) => (
                            <option key={key} value={JSON.stringify(c)}>{JSON.stringify(c)}</option>
                        ))}
                    </select>
                </p>
            </React.Fragment>
            <input className="inpt" type="file" onChange={(e) => handleFile(e)} />
        </div >
    );
};
export default Home;
















// export const ParseExcel = () => {
//     const handleFile = (e) => {
//         console.log(e.target.files[0])
//     }
// };


// function Home() {
//     const [fileName, setFileName] = useState(null);
//     const handleFile = async (e) => {
//         const file = e.target.files[0];
//         setFileName(file.name);
//         const data = await file.arrayBuffer();
//         const workbook = XLSX.read(data);

//         console.log(workbook)
//     };

//     return (

//         <div>
//             {/* <button onClick="" className="pushable">
//                 <span className="shadow"></span>
//                 <span className="edge"></span>
//                 <span className="front">
//                     Загрузить файл
//                 </span>
//             </button> */}
//             {fileName && (
//                 <p>
//                     FileName: <span>{fileName}</span>
//                 </p>
//             )}
//             <input className="inpt" type="file" onChange={(e) => handleFile(e)} />

//             <div className="btn-conteiner">
//                 <a className="btn-content">
//                     <span className="btn-title">Далее</span>
//                     <span className="icon-arrow">
//                         <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//                             <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//                                 <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                 <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                 <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
//                             </g>
//                         </svg>
//                     </span>
//                 </a>
//             </div>
//         </div>
//     );
// }
// export default Home;