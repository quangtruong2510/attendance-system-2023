import { useState, useCallback } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

interface Props {
  isActive: boolean;
  onClose: () => void
}


const LoadingModal: React.FC<Props> = (props: Props) => {
  const [isActive, setActive] = useState(props.isActive)
  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading your content...'
    >
      <div style={{ height: 200 }}>
        <p>Some content or children or something.</p>
      </div>
    </LoadingOverlay>
  )
}
export default LoadingModal;