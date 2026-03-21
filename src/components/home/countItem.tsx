import "./components.scss";

interface CountItemInterface {
    value: string;
    title: string;
}

const CountItem = (props: CountItemInterface) => {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="w-[43px] h-[41px] text-[34px] font-medium leading-[41.15px] text-gray-800">
                {props.value}
            </div>
            <div className="text-[13px] leading-[15.73px] text-gray-600">{props.title}</div>
        </div>
    );
};

export default CountItem;