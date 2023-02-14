import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Task } from "@/types/Types";


type Props = {
    tasks: Task[];
    title: string;
};

'use client';


const TablePrinter = forwardRef( ({ tasks, title }: Props, _ref) => {
    return (
        <div>
            <p>Hello: {title}</p>
        </div>
    )
})

export default TablePrinter;