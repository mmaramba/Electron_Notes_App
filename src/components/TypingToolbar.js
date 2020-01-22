import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';


class TypingToolbar extends React.Component {
    constructor(props) {
      super(props)
    }
  
    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  Comic Sans
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  Arial
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  Wingdings
                </a>
              </Menu.Item>
            </Menu>
          );

          const fontMenu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  12
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  14
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  16
                </a>
              </Menu.Item>
            </Menu>
          );
      return (
            <div className="typingToolbar">
                <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Comic Sans <Icon style={{marginLeft: "40px", marginRight: "10px"}} type="down" />
                </a>
                </Dropdown>
                <Dropdown overlay={fontMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    12 <Icon style={{marginLeft: "10px", marginRight: "10px"}} type="down" />
                </a>
                </Dropdown>
                <span style={{marginLeft: "20px"}}></span>
                <Icon className="tbIcon" type="font-colors" />
                <Icon className="tbIcon" type="bg-colors" />
                <Icon className="tbIcon" type="highlight" />
                <span style={{marginLeft: "20px"}}></span>
                <Icon className="tbIcon" type="bold" />
                <Icon className="tbIcon" type="italic" />
                <Icon className="tbIcon" type="underline" />
                <span style={{marginLeft: "20px"}}></span>
                <Icon className="tbIcon" type="align-left" />
                <Icon className="tbIcon" type="align-center" />
                <Icon className="tbIcon" type="align-right" />
            </div>
      )
    }
  }

  export default TypingToolbar;