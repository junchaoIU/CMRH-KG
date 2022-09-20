import React, { PureComponent } from 'react';
import { Spin, Col, Row, message } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import Empty from '../../../components/Empty/index';
import Charts from './Charts';
import Information from './Information';
import SearchInput from './SearchInput';

@connect(({ relation, loading }) => ({
  relation,
  loading: loading.effects['relation/getPeople'],
}))
@connect(({ knowledge, loading }) => ({
  knowledge,
  submitting: loading.effects['knowledge/knowledge'],
}))
class searchResult extends PureComponent {
  state = {
    val: false,
    object: '',
    subject: '',
    objectLinks: [],
    subjectLinks: [],
    substance: [],
  };

  componentDidMount() {
    const { parentObject, parentSubject } = this.props;
    if (parentObject !== '' && parentSubject !== '') {
      this.setState({
        object: parentObject,
        subject: parentSubject,
      });
      const searchVal = {
        object: parentObject,
        subject: parentSubject,
      };
      this.search(searchVal);
    }
  }

  onChange = (e) => {
    this.setState({
      object: e.target.value,
    });
  };

  onChange1 = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };

  search = (value) => {
    this.setState({
      objectLinks: [],
      subjectLinks: [],
      val: false,
      substance: [],
    });
    let data = {};
    if (value !== null) {
      data = value;
    } else {
      data = {
        object: this.state.object,
        subject: this.state.subject,
      };
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'relation/getPeople',
      payload: data,
      callback: (response) => {
        if (response[0].object === null) {
          message.warning('未找到两者之间的关系！');
        } else {
          this.setState({
            val: true,
          });
        }
      },
    });
    dispatch({
      type: 'knowledge/getKeyword',
      payload: value !== null ? value.object : this.state.object,
      callback: (response) => {
        this.setState({
          objectLinks: response,
        });
      },
    });
    dispatch({
      type: 'knowledge/getKeyword',
      payload: value !== null ? value.subject : this.state.subject,
      callback: (response) => {
        this.setState({
          subjectLinks: response,
        });
      },
    });
    dispatch({
      type: 'knowledge/getSubstance',
      payload:
        value !== null
          ? `${value.object}${value.subject}`
          : `${this.state.object}${this.state.subject}`,
      callback: (response) => {
        if (response !== null) {
          this.setState({
            substance: response,
          });
        }
      },
    });
  };

  render() {
    const { objectLinks, subjectLinks, val, object, subject, substance } = this.state;
    const {
      loading,
      relation: { getPeople },
    } = this.props;
    const loadings = loading === undefined ? false : loading;
    return (
      <div className={styles.search}>
        <SearchInput
          object={object}
          subject={subject}
          search={() => this.search(null)}
          onChange={this.onChange}
          onChange1={this.onChange1}
        />
        <Spin spinning={loadings}>
          {val && objectLinks.length !== 0 && subjectLinks.length !== 0 ? (
            <Row className={styles.content}>
              <Col span={14}>
                <Charts
                  objectLinks={objectLinks}
                  subjectLinks={subjectLinks}
                  propSearch={`${object}和${subject}`}
                  getPeople={getPeople}
                />
              </Col>
              <Col span={10}>
                <Information propSearch={`${object}${subject}`} substance={substance} />
              </Col>
            </Row>
          ) : (
            <Empty />
          )}
        </Spin>
      </div>
    );
  }
}

export default searchResult;
