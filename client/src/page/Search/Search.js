import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
    const [keyWord, setKeyWord] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Search } = Input;

    const onChangeInput = (e) => {
        setKeyWord(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (keyWord) {
            navigate(`/results/${keyWord}`);
        }
    };

    const onSearch = (value) => console.log(value);

    return (
        <Fragment>
            <form onSubmit={onSubmitForm} className="search">
                <div className="search-input">
                    <input
                        onChange={onChangeInput}
                        value={keyWord}
                        placeholder="Search...."
                        className="search-text"
                        type="text"
                    />
                    <input
                        className="search-submit"
                        type="submit"
                        value="Search"
                    />
                </div>
            </form>
            <div className="search-input">
                <Form
                    className="search-text"
                    // onFinish={handleSubmit}
                    form={form}
                >
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </Form>
            </div>
        </Fragment>
    );
}

export default Search;
