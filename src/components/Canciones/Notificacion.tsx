import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  mensaje: string;
  tipo: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

const Notificacion: React.FC<Props> = ({ mensaje, tipo, show, onClose }) => {
  if (!show) return null;

  return (
    <Alert variant={tipo === 'success' ? 'success' : 'danger'} dismissible onClose={onClose}>
      {mensaje}
    </Alert>
  );
};

export default Notificacion;
