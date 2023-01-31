import React from 'react';
import Section from './Feedback/Sectons';
import FeedbackButtons from './Feedback/Buttons';
import Notification from './Feedback/Notification';
import Statistics from './Feedback/Statistics';
import css from './App.module.css';
import { useState } from 'react';


export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const keys = ['good', 'neutral', 'bad'];

  const countPositiveFeedbackPercentage = total => {
    if (!good) {
      return 0;
    }
    return Math.round((100 / total) * good);
  };

  const click = event => {
    const name = event.target.name;
    if (name === 'good') {
      setGood(prevState => prevState + 1);
    }
    if (name === 'neutral') {
      setNeutral(prevState => prevState + 1);
    }
    if (name === 'bad') {
      setBad(prevState => prevState + 1);
    }
  };

  const total = good + neutral + bad;
  const positivePercentage = countPositiveFeedbackPercentage(total);
  return (
    <section className={css.section}>
      <h1 className={css.visuallyHidden}>Feedback</h1>
      <div className={css.box}>
        <Section title="Please leave feedback">
          <FeedbackButtons options={keys} onLeaveFeedback={click} />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    </section>
  );
};