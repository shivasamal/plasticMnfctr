import { useOutletContext } from 'react-router-dom'
import EntityCrudTable from '../components/EntityCrudTable'
import { useErp } from '../context/ErpContext'

const UserRolesPage = () => {
  const { notify } = useOutletContext()
  const { users, userCrud } = useErp()

  return (
    <EntityCrudTable
      title="User & Role Management"
      subtitle="Manage login identities and accountability roles."
      rows={users}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'login', label: 'Login' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        {
          key: 'role',
          label: 'Role',
          type: 'select',
          options: [
            { value: 'Admin', label: 'Admin' },
            { value: 'Shift Manager', label: 'Shift Manager' },
            { value: 'Operator', label: 'Operator' },
            { value: 'Warehouse Staff', label: 'Warehouse Staff' },
          ],
        },
        { key: 'login', label: 'Login Email', type: 'email' },
      ]}
      addLabel="Add User"
      onAdd={(data) => {
        userCrud.add(data, 'U')
        notify('User created successfully.')
      }}
      onUpdate={(id, data) => {
        userCrud.update(id, data)
        notify('User updated successfully.')
      }}
      onDelete={(id) => {
        userCrud.remove(id)
        notify('User removed successfully.')
      }}
    />
  )
}

export default UserRolesPage
