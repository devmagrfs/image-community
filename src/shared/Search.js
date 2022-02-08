import React from 'react';
import _ from "lodash";

const Search = () => {

    const [text, setText] = React.useState("");


    // lodash 패키지에서 _에서 debounce를 갖고온다.
    // debounce 안에서 어떤 것을 할건지 넣어주고, 몇 밀리초를 기다릴건지 알려준다.
    const debounce = _.debounce((e) => {
        console.log(e);
    }, 1000);

    const throttle = _.throttle((e) => {
        console.log(e.target.value);
    }, 1000)

    // useCallback은 앞에 인자에 어떤걸 저장시킬지 함수를 넣고
    // 텍스트가 변할 때 이 함수도 변한다 라는 식으로 써준다.
    // 이 함수를 초기화할 조건을 넣어주면 된다.
    const keypress = React.useCallback(debounce, []);

    const onChange = (e) => {
        keypress(e.target.value);
    }
    return (
        <div>
            <input type="text" onChange={onChange} />
        </div>
    )
}

export default Search;