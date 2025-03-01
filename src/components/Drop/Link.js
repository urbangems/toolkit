/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import CONTEXT_TYPES from './ContextTypes';

export default class Link extends Component {
    static contextTypes = CONTEXT_TYPES;

    static propTypes = {
        children: PropTypes.node
    };

    /**
     * Render the drop link.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <a role="menuitem" {...this.inheritNativeProps(props)}>
                {props.children}
            </a>
        );
    }

}
