import {amountChatData} from '../APIs';

function Chart() {
    const data = amountChatData;
    return (
        <div>
            {data}
        </div>
    )
}

export default Chart;