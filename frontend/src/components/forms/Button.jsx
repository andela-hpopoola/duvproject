import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLOR_STYLE } from 'utils/constants';
import { Loading } from 'components/common/utils/PlayingMusicAnimation';

const Button = ({
  className,
  loading,
  loadingText,
  children,
  onClick,
  color
}) => (
  <button
    className={classNames('btn', `btn-${color}`, className)}
    onClick={onClick}
    type="button"
  >
    {loading ? (
      <>
        <Loading />
        {loadingText || children}
      </>
    ) : (
      children
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.any,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(COLOR_STYLE)
};

Button.defaultProps = {
  children: 'Submit',
  className: 'btn-wide btn-transparent',
  loading: false,
  loadingText: null,
  onClick: () => {},
  color: COLOR_STYLE[0]
};

export default Button;
