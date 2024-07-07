import React, { useState } from 'react';
import classNames from 'classnames';
import './TableRow.css';

const TableRow = ({ row, selectedRows, toggleRowSelection }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = (e) => {
        e.stopPropagation(); // Prevent row selection on expand button click
        setIsExpanded(!isExpanded);
    };

    const handleRowClick = () => {
        toggleRowSelection(row.id);
    };

    return (
        <>
            <tr
                className={classNames('table-row', { 'selected': selectedRows[row.id] })}
                onClick={handleRowClick}
            >
                <td>{row.id}</td>
                <td>{row.text1}</td>
                <td>{row.text2}</td>
                <td>
                    {row.children.length > 0 && (
                        <button className="expand-button" onClick={handleExpandClick}>
                            {isExpanded ? '-' : '+'}
                        </button>
                    )}
                </td>
            </tr>
            {isExpanded && (
                <tr className="child-row">
                    <td colSpan="4">
                        <div className="child-content">
                            {row.children.map(child => (
                                <TableRow
                                    key={child.id}
                                    row={child}
                                    selectedRows={selectedRows}
                                    toggleRowSelection={toggleRowSelection}
                                />
                            ))}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
