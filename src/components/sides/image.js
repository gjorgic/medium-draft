import React, { PropTypes } from 'react';

import { addNewBlock } from '../../model';
import { Block } from '../../util/constants';

export default class ImageButton extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      // console.log(this.props.getEditorState());
      // eslint-disable-next-line no-undef
      const next = (src) => {
        this.props.setEditorState(addNewBlock(
          this.props.getEditorState(),
          Block.IMAGE, {
            src,
          }
        ));
      }

      if(this.props.handler) {
        this.props.handler(file, next);
      } else {
        next(URL.createObjectURL(file));
      }
    }
    this.props.close();
  }

  render() {
    return (
      <button className="md-sb-button md-sb-img-button" onClick={this.onClick}>
        <i className="fa fa-image" />
        <input
          type="file"
          ref={(c) => { this.input = c; }}
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </button>
    );
  }
}

ImageButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
};
