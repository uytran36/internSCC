import {getChatData} from '../APIs';

const Chart = () => {
    getChatData().then((res) => {
        console.log(res.data);
    })
    return (
        <div>
            abca
        </div>
    )
}

export default Chart;