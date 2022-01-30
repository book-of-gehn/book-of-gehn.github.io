/*
 * Determine the current time several times in tight loop
 * and then print the measurements.
 * How many times the code will loop it is defined by argument.
 *
 * Repeat this experiment for several different implementations
 * of "clocks".
 * */
#include <time.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

void print_nsec_resolution(const size_t rounds, const char* const category, const struct timespec * const times1) {
    uint64_t ref = times1[0].tv_sec * 1000000000; // seconds as nanoseconds
    ref += times1[0].tv_nsec; // plus the nanoseconds

    for (int i = 0; i < rounds; ++i) {
        uint64_t tmp = times1[i].tv_sec * 1000000000; // seconds as nanoseconds
        tmp += times1[i].tv_nsec; // plus the nanoseconds

        printf("%s %lu\n", category, tmp-ref);
    }
}

void print_usec_resolution(const size_t rounds, const char* const category, const struct timeval * const times2) {
    uint64_t ref = times2[0].tv_sec * 1000000000; // seconds as nanoseconds
    ref += times2[0].tv_usec * 1000; // plus the microseconds as nanoseconds

    for (int i = 0; i < rounds; ++i) {
        uint64_t tmp = times2[i].tv_sec * 1000000000; // seconds as nanoseconds
        tmp += times2[i].tv_usec * 1000; // plus the microseconds as nanoseconds

        printf("%s %lu\n", category, tmp-ref);
    }
}

void print_sec_resolution(const size_t rounds, const char* const category, const uint64_t* const times3) {
    uint64_t ref = times3[0] * 1000000000; // seconds as nanoseconds

    for (int i = 0; i < rounds; ++i) {
        uint64_t tmp = times3[i] * 1000000000; // seconds as nanoseconds

        printf("%s %lu\n", category, tmp-ref);
    }
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        printf("Usage: %s <rounds>\n", argv[0]);
        return -1;
    }
    const size_t rounds = atoi(argv[1]);

    struct timespec * const times1 = malloc(sizeof(*times1) * rounds);

    for (int i = 0; i < rounds; ++i) {
        clock_gettime(CLOCK_MONOTONIC, &times1[i]);
    }
    print_nsec_resolution(rounds, "mono", times1);

    for (int i = 0; i < rounds; ++i) {
        clock_gettime(CLOCK_MONOTONIC_RAW, &times1[i]);
    }
    print_nsec_resolution(rounds, "mraw", times1);

    for (int i = 0; i < rounds; ++i) {
        clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &times1[i]);
    }
    print_nsec_resolution(rounds, "pcpu", times1);

    for (int i = 0; i < rounds; ++i) {
        clock_gettime(CLOCK_THREAD_CPUTIME_ID, &times1[i]);
    }
    print_nsec_resolution(rounds, "tcpu", times1);
    free(times1);

    struct timeval * const times2 = malloc(sizeof(*times2) * rounds);
    struct rusage * const res = malloc(sizeof(*res) * rounds);

    for (int i = 0; i < rounds; ++i) {
        gettimeofday(&times2[i], NULL);
    }
    print_usec_resolution(rounds, "tofd", times2);

    for (int i = 0; i < rounds; ++i) {
        getrusage(RUSAGE_SELF, &res[i]);
    }

    // Sum User + Kernel (sys) times
    for (int i = 0; i < rounds; ++i) {
        const struct timeval user = res[i].ru_utime;
        const struct timeval sys = res[i].ru_stime;

        times2[i].tv_sec = user.tv_sec + sys.tv_sec;
        times2[i].tv_usec = user.tv_usec + sys.tv_usec;
    }

    print_usec_resolution(rounds, "ruse", times2);
    free(res);
    free(times2);

    uint64_t * const times3 = malloc(sizeof(*times3) * rounds);

    for (int i = 0; i < rounds; ++i) {
        times3[i] = time(NULL);
    }
    print_sec_resolution(rounds, "time", times3);
    free(times3);

    return 0;
}
