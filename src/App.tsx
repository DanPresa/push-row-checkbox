import { FC, ChangeEvent, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Checkbox, Toolbar } from '@mui/material';

type UserType = {
  name: string;
  salary: number;
};

const users: UserType[] = [
  { name: 'Jeevan', salary: 1000 },
  { name: 'Manish', salary: 1000 },
  { name: 'Prince', salary: 1000 },
  { name: 'Arti', salary: 1000 },
  { name: 'rahul', salary: 1000 },
];

const formatNumber = (num: number) => `${num.toFixed(2)}`;

const App: FC<{}> = () => {
  const [usersSelected, setUsersSelected] = useState<UserType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const onSelectedAllClick = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;

    if (checked) {
      const tempUsers = users.map((user) => {
        return { ...user };
      });

      setUsersSelected(tempUsers);
      return;
    }

    setUsersSelected([]);
  };

  const getUser = (
    { target }: ChangeEvent<HTMLInputElement>,
    user: UserType
  ) => {
    const { checked } = target;

    return checked
      ? setUsersSelected((prev) => [...prev, user])
      : setUsersSelected((prev) => prev.filter((u) => u.name !== user.name));
  };

  const sumTotal = () => {
    const sum = usersSelected.reduce((sum, obj) => {
      return sum + obj.salary;
    }, 0);

    setTotal(sum);
  };

  const isSelected = (name: string) =>
    usersSelected.map((user) => user.name).indexOf(name) !== -1;

  useEffect(() => {
    sumTotal();
  }, [usersSelected]);

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '120px' }}>
              <Checkbox
                checked={
                  users.length > 0 && usersSelected.length === users.length
                }
                onChange={onSelectedAllClick}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isItemSelected = isSelected(user.name);

            return (
              <TableRow key={user.name}>
                <TableCell>
                  <Checkbox
                    checked={isItemSelected}
                    onChange={(e) => getUser(e, user)}
                  />
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                  ${formatNumber(user.salary)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {usersSelected.length > 0 && (
        <Toolbar sx={{ backgroundColor: '#ccc' }}>
          ${formatNumber(total)}
        </Toolbar>
      )}
      <pre>{JSON.stringify(usersSelected, null, 4)}</pre>
    </>
  );
};

export default App;
