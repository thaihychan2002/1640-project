import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";

const { TextArea } = Input;
export default function Category({ record_cat }) {
    const dispatch_ca = useDispatch()
    const [data, setdata] = React.useState({
        _id: '',
        name: '',
    });
    const onUpdateHandler = React.useCallback(() => {
        dispatch_ca(actions.updateCategories.updateCategoriesRequest({ _id: data._id, name: data.name }))
        setdata({ _id: '', name: '' })
    }, [data, dispatch_ca]);
    return (
        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={8} lg={8} className="row-new-post">
                <TextArea
                    allowClear
                    autoSize={{
                        minRows: 1,
                        maxRows: 1,
                    }}
                    placeholder='Write the updated name'
                    size="large"
                    value={data.name}
                    onChange={(e) =>
                        setdata({ ...data, name: e.target.value, _id: record_cat._id })
                    }
                    required
                />
            </Grid>
            <Grid item xs={4} lg={4} className="row-new-post">
                <Link onClick={onUpdateHandler}>Update category</Link>
            </Grid>
        </Grid >
    );
}