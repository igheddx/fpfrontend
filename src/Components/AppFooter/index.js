import '../../App.css';
import { Typography } from "antd"

function AppFooter() {

    return (
        <div className='AppFooter'>
            <Typography.Link href="Phone: 1800-123-4567">1 800-123-4567</Typography.Link>
            <Typography.Link href="https://www.google.com">Privacy Policy</Typography.Link>
            <Typography.Link href="https://www.google.com">Terms of Use</Typography.Link>
        
        
        </div>


    )
}

export default AppFooter;