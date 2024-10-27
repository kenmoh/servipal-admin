import { getUsers } from '@/actions/users'
import UsersTable from '@/components/users-table'
import React from 'react'

const Users = async () => {
    const users = await getUsers()
    return (
        <>
            <div className='text-4xl text-slate-500 dark:text-white'>Users</div>
            <section>
                <UsersTable users={users} />
            </section>
        </>
    )
}

export default Users