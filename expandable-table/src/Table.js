import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import './Table.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState({});

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setData(data.rows);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleRowSelection = (id) => {
        setSelectedRows(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text 1</th>
                        <th>Text 2</th>
                        <th>Expand</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <TableRow
                            key={row.id}
                            row={row}
                            selectedRows={selectedRows}
                            toggleRowSelection={toggleRowSelection}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

