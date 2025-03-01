/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React from 'react';
import LazyLoad from './LazyLoad';
import cssClass from '../../prop-types/cssClass';

export default class Background extends LazyLoad {
    static defaultProps = {
        elementClassName: ['lazy-load', 'bg'],
        ...LazyLoad.defaultProps
    };

    static propTypes = {
        elementClassName: cssClass.isRequired,
        ...LazyLoad.propTypes
    };

    /**
     * Render the lazy loaded element.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return this.transferToChild(props.children, {
            className: this.formatClass(props.elementClassName, {
                'is-loaded': this.state.loaded
            }),
            ref: 'element'
        });
    }
}
