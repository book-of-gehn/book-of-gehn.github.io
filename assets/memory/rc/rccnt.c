#define _GNU_SOURCE
#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>

#define ROUNDS 10

struct ctx_t {
    int *data;
    int *counters;
    int n;
};

void* loop(void *p) {
    struct ctx_t *ctx = p;
    int *data = ctx->data;
    int *counters = ctx->counters;
    int n = ctx->n;

    for (int j = 0; j < ROUNDS; ++j) {
        for (int i = 0; i < DATASZ; ++i) {
            int cnt = 0;
            while(data[i] % 2 == n) {
                ++cnt;
            }
            ++data[i];
            counters[i] = cnt;
        }
    }

    return NULL;
}

int main(int argc, char *argv[]) {
    if (argc != 3)
        return -1;

    int *data = calloc(DATASZ, sizeof(int));

    pthread_t ths[2];
    struct ctx_t ctxs[] = {
        {data, calloc(DATASZ, sizeof(int)), 0},
        {data, calloc(DATASZ, sizeof(int)), 1}
    };

    cpu_set_t cpuset;
    pthread_attr_t attr;
    pthread_attr_init(&attr);

    for (int i = 0; i < 2; ++i) {
        CPU_ZERO(&cpuset);
        CPU_SET(atoi(argv[i+1]), &cpuset);
        pthread_attr_setaffinity_np(&attr, sizeof(cpu_set_t), &cpuset);
        pthread_create(&ths[i], &attr, loop, &ctxs[i]);
    }

    pthread_join(ths[0], NULL);
    pthread_join(ths[1], NULL);

    int sum = 0;
    for (int i = 0; i < DATASZ; ++i)
        sum += data[i];

    for (int j = 0; j < 2; ++j) {
        for (int i = 0; i < DATASZ; ++i)
            printf("%d ", ctxs[j].counters[i]);
        printf("\n");
        free(ctxs[j].counters);
    }

    free(data);
    printf("Sum %d\n", sum);

    return 0;
}
