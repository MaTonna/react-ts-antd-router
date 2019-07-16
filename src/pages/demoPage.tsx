/*
 * @Description:
 * @Author: xiaoya
 * @Date: 2019-07-10 11:57:53
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-07-16 14:33:29
 */

import React, { Component, FormEvent, ReactNode } from 'react';
import { Form, Table, Row, Col, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import AddModal from '@components/AddModal';

const FormItem = Form.Item;
const initialState = {
  dataSource: [],
  loading: false,
  paginator: {
    page: 1,
    items: 0,
    itemsPerPage: 20,
  },
  isShowAddModal: false
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class DemoPageForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '姓名',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    key: 'age',
    dataIndex: 'age',
  },
  {
    title: '住址',
    key: 'address',
    dataIndex: 'address',
  }]

  handlePagination = (currentpage: number, pageSize: number): void => {
    this.handlerSubmit(null, currentpage, pageSize);
  }

  handlerSubmit = (
    event?: FormEvent<HTMLFormElement>,
    currentPage = this.state.paginator.page,
    pageSize = this.state.paginator.itemsPerPage
  ): void => {
    event && event.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.getTableData(values, currentPage, pageSize);
    });
  };

  getTableData = (values: object, currentPage: number, pageSize: number): void => {
    console.log(values, currentPage, pageSize)
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }]
    const paginator = {
      page: 1,
      items: 0,
      itemsPerPage: 20,
    }
    this.setState({
      dataSource,
      paginator,
    });
  }

  showAddModal() {
    this.setState({
      isShowAddModal: true
    })
  }

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, loading, paginator: { items, page, itemsPerPage }, isShowAddModal } = this.state;
    const { columns } = this;
    return (
      <div className="main-content">
        <div className="query-block">
          <Form onSubmit={this.handlerSubmit}>
            <Row type="flex">
              <Col>
                <FormItem>
                  {getFieldDecorator('searchSomething', {
                    initialValue: '',
                  })(<Input placeholder="搜索" />)}
                </FormItem>
              </Col>
              <Col>
                <Button className="fix-gap" type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button className="fix-gap" type="primary" onClick={() => this.showAddModal()}>
                  增加
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          className="my-table"
          rowKey={(row: { key: string }) => row.key}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          locale={{ emptyText: '未找到对应内容' }}
          pagination={{
            total: items,
            current: page,
            pageSize: itemsPerPage,
            showTotal: (total: number) => `共计 ${total} 条记录`,
            onChange: (current: number, size: number) => {
              this.handlePagination(current, size);
            },
            onShowSizeChange: (current: number, size: number) => {
              this.handlePagination(current, size);
            },
          }}
        />
        {isShowAddModal &&
          <AddModal
            visible={isShowAddModal}
            closeModal={() => {
              this.setState({
                isShowAddModal: false
              })
            }}
          />
        }
      </div>
    )
  }
}

const DemoPage = Form.create<FormProps>()(DemoPageForm);
export default DemoPage;
