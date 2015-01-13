---
layout: page
title: The INET Test Suite
underMenu: Development
---

The INET Framework has multiple test suites that performs regression testing, unit testing and validation.

*   Smoke tests (for basic regression testing)
    *   runs the simulation for a while to ensure that it does not crash or stop with a runtime error
    *   this is simplest kind of test, provides low confidence in the models, but it is very easy to implement


*   Fingerprint tests (for detecting regressions after changes)
    *   creates a hash of certain properties of the simulation (currently the time and module ID for each event)
    *   designed to change if simulation trajectory changes
    *   suitable for regression testing
    *   should not change with refactoring changes, but may change if a bug has been fixed


*   Unit test (for testing individual classes)
    *   can use OMNeT++ unit test framework (opp_test) and .test files


*   Module tests (for functional testing of individual modules, typically protocol implementations)
    *   send the module some input, then check how it reacts (messages and/or log output)
    *   you can use the OMNeT++ unit test framework (opp_test) and .test files


*   Statistical and validation tests
    *   check that model produces statistically the same results as before (e.g. perform 100 runs before and after a change, and use Student t-test [for mean] and F-test [for variance] to check that both set of results are from the same distribution)
    *   you can use the `inet/tests/misc/statistical/test.R` script for your tests
    *   validation tests can be created by comparing the statistical results with theoretical values, physical measurements, or other simulators' results

At the bare minimum, new models are expected to have smoke tests and fingerprint tests (they are very easy to add). Preferably, they also have unit tests, module tests and validation tests.

