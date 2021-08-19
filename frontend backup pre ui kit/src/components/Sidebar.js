import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';


import 'react-pro-sidebar/dist/css/styles.css';
import d20 from '../d20.ico'


const Sidebar = () => {


    return (
        <div className="SidebarDiv">
            <ProSidebar>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem

                            suffix={<span className="badge red"></span>}
                        >

                        </MenuItem>
                        <MenuItem></MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}

                        >
                            <MenuItem> 1</MenuItem>
                            <MenuItem> 2</MenuItem>
                            <MenuItem> 3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            prefix={<span className="badge gray">3</span>}


                        >
                            <MenuItem> 1</MenuItem>
                            <MenuItem> 2</MenuItem>
                            <MenuItem> 3</MenuItem>
                        </SubMenu>
                        <SubMenu>
                            <MenuItem>1 </MenuItem>
                            <MenuItem>2 </MenuItem>
                            <SubMenu>
                                <MenuItem> </MenuItem>
                                <MenuItem></MenuItem>
                                <SubMenu>
                                    <MenuItem> 3.3.1 </MenuItem>
                                    <MenuItem> 3.3.2 </MenuItem>
                                    <MenuItem> 3.3.3 </MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >

                            <span></span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>

        </div>

    )

}

export default Sidebar