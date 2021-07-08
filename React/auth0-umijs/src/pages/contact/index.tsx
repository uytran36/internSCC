import TableContacts from './contactManagement/TableContacts';
import { useAuth0 } from '@auth0/auth0-react';

function Contact(props: any) {
  const { logout } = useAuth0();

  //when click logout button
  const onClickLogout = () => {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('refreshJwtToken');
    window.localStorage.removeItem('token');
    logout();
  };

  return (
    <div>
      <TableContacts onClickLogout={onClickLogout} />
    </div>
  );
}

export default Contact;
