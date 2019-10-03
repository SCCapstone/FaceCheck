import firebase from 'react-native-firebase'
import React from 'react'
import { Card, Paragraph, ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { watchClasses } from 'FaceCheckApp/src/redux/app-redux'
import mockClasses from 'FaceCheckApp/src/assets/mockClasses.json'
import styles from 'FaceCheckApp/src/assets/styles'

const mapStateToProps = (state) => {
    return {
        classes: state.classes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchClasses: () => { dispatch(watchClasses()) },
    }
}

class ClassCards extends React.Component {
    constructor(props) {
        super(props)
        this.props.watchClasses()
    }

    maybeRenderClassList() {
        if(this.props.classes !== []) {
            return (
                this.props.classes.map((currClass) => {
                return(
                <Card style={styles.card} key={currClass.classID} onPress = {() => {
                    this.props.navigation.navigate('ClassScreen', {currClass: JSON.stringify(currClass)})
                }}>
                    <Card.Title title={currClass.name} />
                    <Card.Content>
                    <Paragraph>
                        Teacher: {currClass.teacher}
                    </Paragraph>
                    </Card.Content>
                </Card>
                )})
            )
        } else {
            return(
                <ActivityIndicator animating={true}/>
            )
        }
    }
  
    render() {
        return(
            <View>
                {this.maybeRenderClassList()}
            </View>
        )
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ClassCards)
