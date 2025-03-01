/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { Children, PropTypes } from 'react';
import Component from '../../Component';
import Item from './Item';
import bind from '../../decorators/bind';
import children from '../../prop-types/children';
import collection from '../../prop-types/collection';
import cssClass from '../../prop-types/cssClass';
import CONTEXT_TYPES from './ContextTypes';

export default class Accordion extends Component {
    static childContextTypes = CONTEXT_TYPES;

    static defaultProps = {
        collapsible: false,
        defaultIndex: 0,
        elementClassName: 'accordion',
        multiple: false
    };

    static propTypes = {
        children: children(Item),
        className: cssClass,
        collapsible: PropTypes.bool,
        defaultIndex: collection.number,
        elementClassName: cssClass.isRequired,
        multiple: PropTypes.bool
    };

    state = {
        indices: new Set()
    };

    /**
     * Generate a UID.
     */
    constructor() {
        super();

        this.generateUID();
    }

    /**
     * Define a context that is passed to all children.
     *
     * @returns {Object}
     */
    getChildContext() {
        return {
            activeIndices: Array.from(this.state.indices),
            hideItem: this.hideItem,
            isItemActive: this.isItemActive,
            isItemCollapsible: this.isItemCollapsible,
            showItem: this.showItem,
            toggleItem: this.toggleItem,
            uid: this.getUID()
        };
    }

    /**
     * Set the default index before mounting.
     */
    componentWillMount() {
        this.showItem(this.props.defaultIndex);
    }

    /**
     * Only update if item indices are different.
     *
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {Boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.multiple || nextState.indices !== this.state.indices);
    }

    /**
     * Conceal an item by removing its index from the active state.
     *
     * @param {Number|Number[]} index
     */
    @bind
    hideItem(index) {
        let indices = new Set(this.state.indices);

        if (!Array.isArray(index)) {
            index = [index];
        }

        index.forEach(i => indices.delete(i));

        this.setState({
            indices
        });
    }

    /**
     * Returns true if the item at the specified index can be collapsed.
     *
     * @param {Number} index
     * @returns {Boolean}
     */
    @bind
    isItemCollapsible(index) {
        return ((this.props.multiple || this.props.collapsible) && this.isItemActive(index));
    }

    /**
     * Returns true if the item at the specified index is active based on the current indices.
     *
     * @param {Number} index
     * @returns {Boolean}
     */
    @bind
    isItemActive(index) {
        return (this.state.indices.has(index));
    }

    /**
     * Reveal the item at the defined index, and collapse all other items.
     *
     * @param {Number|Number[]} index
     */
    @bind
    showItem(index) {
        let multiple = this.props.multiple,
            indices = new Set(multiple ? this.state.indices : []),
            total = Children.count(this.props.children);

        if (Array.isArray(index)) {
            if (!multiple) {
                index = [index[0]];
            }
        } else {
            index = [index];
        }

        index.forEach(i => {
            if (i >= 0 && i < total) {
                indices.add(i);
            }
        });

        this.setState({
            indices
        });
    }

    /**
     * Toggle the display state of a specific index.
     *
     * @param {Number|Number[]} index
     */
    @bind
    toggleItem(index) {
        if (this.isItemCollapsible(index)) {
            this.hideItem(index);
        } else {
            this.showItem(index);
        }
    }

    /**
     * Render the wrapping accordion element.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <ul role="tablist"
                id={this.formatID('accordion')}
                className={this.formatClass(props.elementClassName, props.className, {
                    'is-collapsible': props.collapsible,
                    'is-multiple': props.multiple
                })}
                aria-live="off"
                aria-multiselectable={props.multiple}
                {...this.inheritNativeProps(props)}>

                {props.children}
            </ul>
        );
    }
}
