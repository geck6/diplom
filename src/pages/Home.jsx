import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Puff } from "react-loader-spinner";



function Home() {
    const [headers, setHeaders] = useState([]);
    const [values, setValues] = useState([]);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [compareHeader, setCompareHeader] = useState(null);
    const [compareValue, setCompareValue] = useState(null);
    const [result, setResult] = useState(null);
    const [compareResult, setCompareResult] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Преобразование обозначений Excel в индекс строки и колонки
    const excelToIndex = (excel) => {
        const match = excel.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
        if (match) {
            const startColumn = match[1].split('').reduce((result, char, i) => {
                return result + (char.charCodeAt(0) - 64) * (26 ** (match[1].length - i - 1));
            }, 0);
            const endColumn = match[3].split('').reduce((result, char, i) => {
                return result + (char.charCodeAt(0) - 64) * (26 ** (match[3].length - i - 1));
            }, 0);
            return {
                startRow: parseInt(match[2], 10) - 1,
                endRow: parseInt(match[4], 10) - 1,
                startColumn: startColumn - 1,
                endColumn: endColumn - 1,
            };
        }
        return null;
    };

    const headersRange = excelToIndex('B8:B125'); // Задаем диапазон заголовков
    const valuesRange = excelToIndex('A5:DH5'); // Задаем диапазон значений

    const handleFileUpload = (event) => {
        setIsLoading(true); // начинаем загрузку
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const buffer = e.target.result;
            const workbook = XLSX.read(buffer, { type: 'binary' });

            // Парсинг данных
            const sheet_name_list = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheet_name_list[1]];
            let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Применяем заданный диапазон заголовков
            let headerData = data.slice(headersRange.startRow, headersRange.endRow + 1).map(row => row[headersRange.startColumn]);

            // Применяем заданный диапазон значений и разбиваем каждую строку на отдельные элементы
            let valueData = [];
            data.slice(valuesRange.startRow, valuesRange.endRow + 1).forEach(row => {
                row.slice(valuesRange.startColumn, valuesRange.endColumn + 1).forEach(value => {
                    valueData.push(String(value)); // Преобразуем значение в строку перед добавлением в массив
                });
            });

            setJsonData(data);
            setHeaders(headerData);
            setValues(valueData);
            setIsLoading(false);
        };

        reader.readAsBinaryString(file);
    };

    const handleHeaderChange = (event) => {
        setSelectedHeader(event.target.value);
    };

    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const findResult = (header, value, setResult) => {
        // Ищем индекс выбранного заголовка и значения
        const headerIndex = headers.findIndex(h => h === header);
        const valueIndex = values.findIndex(v => v === value);

        // Ищем результат в данных
        const result = jsonData[headerIndex + headersRange.startRow][valueIndex + valuesRange.startColumn];
        setResult(result);
    };

    const handleCompare = () => {
        setIsCompareMode(true);
    };
    localStorage.setItem('result', result);
    localStorage.setItem('compareResult', compareResult);


    return (
        <div>
            <input  className="btn2" type="file" onChange={handleFileUpload} />
            {isLoading && (
                <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
                    <div className="wheel"></div>
                    <div className="hamster">
                        <div className="hamster__body">
                            <div className="hamster__head">
                                <div className="hamster__ear"></div>
                                <div className="hamster__eye"></div>
                                <div className="hamster__nose"></div>
                            </div>
                            <div className="hamster__limb hamster__limb--fr"></div>
                            <div className="hamster__limb hamster__limb--fl"></div>
                            <div className="hamster__limb hamster__limb--br"></div>
                            <div className="hamster__limb hamster__limb--bl"></div>
                            <div className="hamster__tail"></div>
                        </div>
                    </div>
                    <div className="spoke"></div>
                </div>
            )}

            <select className="btn3" onChange={e => setSelectedHeader(e.target.value)}>
                {headers.map((header, index) => (
                    <option key={index} value={header}>
                        {header}
                    </option>
                ))}
            </select>

            <select  className="btn4" onChange={e => setSelectedValue(e.target.value)}>
                {values.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <button className="btn5" onClick={() => findResult(selectedHeader, selectedValue, setResult)}>Найти результат</button>

            {result && <p className="pHome">Результат: {result}</p>}

            {isCompareMode && (
                <>
                    <select style={{position: 'abcolute', top: '1 px', left: '1%'}} className="btn1" onChange={e => setCompareHeader(e.target.value)}>
                        {headers.map((header, index) => (
                            <option key={index} value={header}>
                                {header}
                            </option>
                        ))}
                    </select>

                    <select style={{position: 'abcolute', top: '1 px', left: '1%'}} className="btn1" onChange={e => setCompareValue(e.target.value)}>
                        {values.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>

                    <button className="btn1" onClick={() => findResult(compareHeader, compareValue, setCompareResult)}>Сравнить с другим результатом</button>
                </>
            )}


            {compareResult && <p className='pHome2'>Новый результат: {compareResult}</p>}


            {!isCompareMode && <button className="btn6" onClick={handleCompare}>Найти новый результат</button>}



            {(result || compareResult) && (
                <Link className='lHome'
                    to={{
                        pathname: "/export",
                        state: {
                            result: result,
                            compareResult: compareResult
                        }
                    }}
                >
                    Экспорт
                </Link>
            )}

        </div>

    );
};

export default Home;





























// //1000 процентов рабочий код
// function Home() {
//     const [headers, setHeaders] = useState([]);
//     const [values, setValues] = useState([]);

//     // Преобразование обозначений Excel в индекс строки и колонки
//     const excelToIndex = (excel) => {
//         const match = excel.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
//         if (match) {
//             const startColumn = match[1].split('').reduce((result, char, i) => {
//                 return result + (char.charCodeAt(0) - 64) * (26 ** (match[1].length - i - 1));
//             }, 0);
//             const endColumn = match[3].split('').reduce((result, char, i) => {
//                 return result + (char.charCodeAt(0) - 64) * (26 ** (match[3].length - i - 1));
//             }, 0);
//             return {
//                 startRow: parseInt(match[2], 10) - 1,
//                 endRow: parseInt(match[4], 10) - 1,
//                 startColumn: startColumn - 1,
//                 endColumn: endColumn - 1,
//             };
//         }
//         return null;
//     };

//     const headersRange = excelToIndex('B8:B125'); // Задаем диапазон заголовков
//     const valuesRange = excelToIndex('A5:DH5'); // Задаем диапазон значений

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             const buffer = e.target.result;
//             const workbook = XLSX.read(buffer, { type: 'binary' });

//             // Парсинг данных
//             const sheet_name_list = workbook.SheetNames;
//             const worksheet = workbook.Sheets[sheet_name_list[1]];
//             let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             // Применяем заданный диапазон заголовков
//             let headerData = jsonData.slice(headersRange.startRow, headersRange.endRow + 1).map(row => row[headersRange.startColumn]);

//             // Применяем заданный диапазон значений и разбиваем каждую строку на отдельные элементы
//             let valueData = [];
//             jsonData.slice(valuesRange.startRow, valuesRange.endRow + 1).forEach(row => {
//                 row.slice(valuesRange.startColumn, valuesRange.endColumn + 1).forEach(value => {
//                     valueData.push(value);
//                 });
//             });

//             setHeaders(headerData);
//             setValues(valueData);
//         };

//         reader.readAsBinaryString(file);
//     };
//     return (
//         <div>
//             <input type="file" accept=".xlsx" onChange={handleFileUpload} />

//             <select>
//                 {headers.map((header, index) => (
//                     <option key={index} value={header}>
//                         {header}
//                     </option>
//                 ))}
//             </select>

//             <select>
//                 {values.map((value, index) => (
//                     <option key={index} value={value}>
//                         {value}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default Home;





























// ПОСЛЕДНИЙ КОД

// function Home() {
//     const [fileName, setFileName] = useState(null);
//     const [columns, setColumns] = useState([]);
//     const [rows, setRows] = useState([]);

//     const handleFile = async (e) => {
//         const importRange = "A3:DH6";
//         const headers = 1;
//         const importRange1 = "B8:B130";
//         const headers1 = "name";
//         const file = e.target.files[0];
//         setFileName(file.name);
//         const data = await file.arrayBuffer();
//         const workbook = XLSX.readFile(data, { sheetrows: 126});

//         const worksheet = workbook.Sheets[workbook.SheetNames[1]];
//         const worksheet1 = workbook.Sheets[workbook.SheetNames[1]];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: importRange, header: headers });
//         const jsonData1 = XLSX.utils.sheet_to_json(worksheet1, { range: importRange1, header: headers1.replace('"','') });

//         // setColumns(jsonData[1,2]);
//         setRows(jsonData1);
//         console.log(jsonData);
//         console.log(jsonData1);

//     };
//     return (
//         <div>
//             {fileName && (
//                 <React.Fragment>
//                     <p className="Pinpt">
//                         Файл: <span>{fileName}</span>
//                     </p>
//                     <p className="Pcol">
//                         Категорию: <select className="selCat">
//                             {columns.map((c, key) => (
//                                 <option key={key} value={JSON.stringify(c)}>{JSON.stringify(c)}</option>
//                             ))}
//                         </select>
//                     </p>
//                 </React.Fragment>
//             )}
//             <React.Fragment>
//                 <p className="Pcol1">
//                     Категорию1: <select className="selCat1">
//                         {rows.map((c, key) => (
//                             <option key={key} value={c}>{JSON.stringify(c)}</option>
//                         ))}
//                     </select>
//                 </p>
//             </React.Fragment>
//             <input className="inpt" type="file" onChange={(e) => handleFile(e)} />
//         </div >
//     );
// };
// export default Home;

