import React from "react";
import * as XLSX from 'xlsx';

function Exp() {
    const result = localStorage.getItem('result');
    const compareResult = localStorage.getItem('compareResult');

    const handleExport = () => {
        if ((!result) || (!compareResult)) {
            alert("Нет данных для экспорта");
            return;
        }

        const wb = XLSX.utils.book_new();

        // Добавление result в книгу
        const ws1 = XLSX.utils.json_to_sheet([{ Result: result }]);
        XLSX.utils.book_append_sheet(wb, ws1, "Result");

        // Если compareResult не равно null, добавьте его в книгу
        if (compareResult) {
            const ws2 = XLSX.utils.json_to_sheet([{ Result: compareResult }]);
            XLSX.utils.book_append_sheet(wb, ws2, "CompareResult");
        }

        XLSX.writeFile(wb, "results.xlsx");
    };

    return (
        <div>
            <button className="btn1" onClick={handleExport}>Экспорт в Excel</button>
        </div>
    );
}

export default Exp;

