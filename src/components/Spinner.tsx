import React from 'react'

function Spinner() {
    return (
        <div className=' flex items-center h-full -pt-[50%] w-full justify-center py-3 z-50'>
            <div className="w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t">

            </div>
        </div>
    )
}

export default Spinner