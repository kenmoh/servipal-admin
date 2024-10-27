import React from 'react'

const Label = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className='flex justify-between items-center text-gray-700 dark:text-gray-200 my-5 border-b-[0.5px]'>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}

export default Label