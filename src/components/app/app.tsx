// import {
//   ConstructorPage,
//   Feed,
//   ForgotPassword,
//   Login,
//   NotFound404,
//   Profile,
//   ProfileOrders,
//   Register,
//   ResetPassword
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';

// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { fetchIngredients } from '../../services/ingredients';
// import { useDispatch } from '../../services/store';
// import { useEffect } from 'react';
// import { ProtectedRoute } from '../ui/protectedroute/ProtectedRoute';
// import { getUser } from '../../services/user';

// const App = () => {
//   const location = useLocation();
//   const background = location.state?.background;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchIngredients());
//     dispatch(getUser());
//   }, []);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={background}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route path='/feed/:number' element={<OrderInfo />} />
//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders/:number'
//           element={
//             <ProtectedRoute>
//               <OrderInfo />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='*' element={<NotFound404 />} />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />
//       </Routes>
//       {background && (
//         <Routes>
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal
//                 title={'Информация об ингредиенте'}
//                 onClose={() => navigate(-1)}
//               >
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
//                 <ProtectedRoute>
//                   <OrderInfo />
//                 </ProtectedRoute>
//               </Modal>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { ProtectedRoute } from '../ui/protectedroute/ProtectedRoute';
import { getUser } from '../../services/user';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'Информация о заказе'}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
